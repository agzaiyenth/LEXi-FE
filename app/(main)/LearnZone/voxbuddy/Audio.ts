import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export class Player {
  private soundObject: Audio.Sound | null = null;

  async init() {
    // No explicit initialization required for expo-av
    console.log('Player initialized');
  }

  /**
   * Plays audio from a PCM buffer.
   * Converts the PCM buffer to a WAV file and plays it.
   * @param buffer - PCM data in Int16Array format
   */
  async play(buffer: Int16Array) {
    try {
      console.log('Received buffer length:', buffer.length);

      if (!buffer || buffer.length === 0) {
        console.warn('PCM buffer is empty. Playback aborted.');
        return;
      }

      if (this.soundObject) {
        await this.soundObject.stopAsync();
        await this.soundObject.unloadAsync();
        this.soundObject = null;
      }

      // Convert PCM buffer to WAV
      const wavUri = await this.convertPCMToWav(buffer);
      console.log('Generated WAV file URI:', wavUri);

      // Verify WAV file exists
      const fileInfo = await FileSystem.getInfoAsync(wavUri);
      console.log('WAV file info:', fileInfo);

      if (!fileInfo.exists) {
        throw new Error(`WAV file not found at ${wavUri}`);
      }

      // Load and play the WAV file
      const { sound } = await Audio.Sound.createAsync({ uri: wavUri });
      this.soundObject = sound;
      await this.soundObject.playAsync();
      console.log('Playback started');
    } catch (error) {
      console.error('Playback error:', error);
    }
  }

  async clear() {
    if (this.soundObject) {
      await this.soundObject.stopAsync();
      await this.soundObject.unloadAsync();
      this.soundObject = null;
      console.log('Playback cleared');
    }
  }

  private async convertPCMToWav(buffer: Int16Array): Promise<string> {
    const sampleRate = 44100; // Set your desired sample rate
    const numChannels = 1; // Mono audio
    const bitsPerSample = 16; // 16-bit PCM

    // Create WAV header
    const header = this.createWavHeader(buffer.length, sampleRate, numChannels, bitsPerSample);
    const wavData = new Uint8Array(header.length + buffer.byteLength);

    wavData.set(header, 0);
    wavData.set(new Uint8Array(buffer.buffer), header.length);

    // Write WAV file to cache directory
    const fileUri = `${FileSystem.cacheDirectory}temp.wav`;
    try {
      await FileSystem.writeAsStringAsync(fileUri, this.uint8ArrayToBase64(wavData), {
        encoding: FileSystem.EncodingType.Base64,
      });
      return fileUri;
    } catch (error) {
      console.error('Error writing WAV file:', error);
      throw error;
    }
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

export class Recorder {
  private recording: Audio.Recording | null = null;
  private onDataAvailable: (buffer: ArrayBuffer) => void;

  constructor(onDataAvailable: (buffer: ArrayBuffer) => void) {
    this.onDataAvailable = onDataAvailable;
  }

  async start() {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        throw new Error('Microphone permission not granted');
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      this.recording = new Audio.Recording();
      await this.recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await this.recording.startAsync();

      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
      this.stop();
    }
  }

  async stop() {
    try {
      if (this.recording) {
        await this.recording.stopAndUnloadAsync();
        const uri = this.recording.getURI();
        console.log('Recording stopped. File URI:', uri);

        if (uri) {
          const response = await fetch(uri);
          const buffer = await response.arrayBuffer();
          this.onDataAvailable(buffer);
        }
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    } finally {
      this.recording = null;
    }
  }
}
