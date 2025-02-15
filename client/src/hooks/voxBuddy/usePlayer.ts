import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export class Player {
  private soundObject: Audio.Sound | null = null;
  private isPlaying = false; // Prevent simultaneous playback
  private playbackQueue: Int16Array[] = []; // Queue for audio buffers
  private isProcessingQueue = false; // Prevent overlapping processing

  async init() {
    console.log('Player initialized');
  }

  async play(buffer: Int16Array) {
    try {
      console.log('Received buffer length:', buffer.length);

      if (!buffer || buffer.length === 0) {
        console.warn('PCM buffer is empty. Playback aborted.');
        return;
      }

      // Enqueue the buffer for playback
      this.playbackQueue.push(buffer);
      if (!this.isProcessingQueue) {
        await this.processQueue();
      }
    } catch (error) {
      console.error('Playback error:', error);
    }
  }

  private async processQueue() {
    this.isProcessingQueue = true;

    while (this.playbackQueue.length > 0) {
      const buffer = this.playbackQueue.shift();
      if (!buffer) continue;

      try {
        await this.playBuffer(buffer);
      } catch (error) {
        console.error('Error processing buffer:', error);
      }
    }

    this.isProcessingQueue = false;
  }

  private async playBuffer(buffer: Int16Array) {
    if (this.isPlaying) {
      console.warn('Already playing audio. Skipping buffer.');
      return;
    }

    this.isPlaying = true;

    try {
      // Unload the previous sound object if it exists
      if (this.soundObject) {
        await this.soundObject.unloadAsync();
        this.soundObject = null;
      }

      // Convert PCM buffer to WAV
      const wavUri = await this.convertPCMToWav(buffer);
      console.log('Generated WAV file URI:', wavUri);

      // Verify WAV file exists
      const fileInfo = await FileSystem.getInfoAsync(wavUri);
      if (!fileInfo.exists) {
        throw new Error(`WAV file not found at ${wavUri}`);
      }

      // Load and play the WAV file
      const { sound } = await Audio.Sound.createAsync({ uri: wavUri });
      this.soundObject = sound;
      await this.soundObject.playAsync();
      console.log('Playback started');

      // Wait for playback to finish
      await new Promise((resolve) => {
        this.soundObject?.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && !status.isPlaying) {
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error('Playback error:', error);
    } finally {
      this.isPlaying = false;
    }
  }

  async clear() {
    if (this.soundObject) {
      await this.soundObject.stopAsync();
      await this.soundObject.unloadAsync();
      this.soundObject = null;
      console.log('Playback cleared');
    }
    this.playbackQueue = []; // Clear the queue
  }

  private async convertPCMToWav(buffer: Int16Array): Promise<string> {
    const sampleRate = 24000; // Set your desired sample rate
    const numChannels = 1; // Mono audio
    const bitsPerSample = 16; // 16-bit PCM

    // Create WAV header
    const header = this.createWavHeader(buffer.length, sampleRate, numChannels, bitsPerSample);
    const wavData = new Uint8Array(header.length + buffer.byteLength);

    wavData.set(header, 0);
    wavData.set(new Uint8Array(buffer.buffer), header.length);

    // Write WAV file to cache directory
    const fileUri = `${FileSystem.cacheDirectory}temp.wav`;
    await FileSystem.writeAsStringAsync(fileUri, this.uint8ArrayToBase64(wavData), {
      encoding: FileSystem.EncodingType.Base64,
    });
    return fileUri;
  }

  private createWavHeader(dataSize: number, sampleRate: number, numChannels: number, bitsPerSample: number): Uint8Array {
    const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
    const blockAlign = (numChannels * bitsPerSample) / 8;
    const buffer = new ArrayBuffer(44);
    const view = new DataView(buffer);

    // RIFF header
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    this.writeString(view, 8, 'WAVE');

    // fmt sub-chunk
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1 size
    view.setUint16(20, 1, true); // Audio format (1 = PCM)
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);

    // data sub-chunk
    this.writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    return new Uint8Array(buffer);
  }

  private writeString(view: DataView, offset: number, text: string) {
    for (let i = 0; i < text.length; i++) {
      view.setUint8(offset + i, text.charCodeAt(i));
    }
  }

  private uint8ArrayToBase64(array: Uint8Array): string {
    return btoa(String.fromCharCode(...array));
  }
}