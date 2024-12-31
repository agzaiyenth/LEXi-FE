// AudioHandler.ts
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import AudioRecorderPlayer, {
  AudioSet,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';

/**
 * A minimal AudioHandler for React Native that:
 * 1) Records from the microphone (capturing chunks as PCM Int16 data if you want).
 * 2) Plays back audio from a queue of incoming PCM data (sketch/placeholder).
 */
export class AudioHandler {
  private recorderPlayer: AudioRecorderPlayer;
  private isRecording = false;
  private isPlaying = false;

  // Just an in-memory queue of PCM chunks (Int16). In practice, you might
  // want to convert these to WAV on the fly or handle them differently.
  private playbackQueue: Int16Array[] = [];

  // Example sample rate, matching your Next.js code
  private sampleRate = 24000;

  constructor() {
    this.recorderPlayer = new AudioRecorderPlayer();
  }

  /**
   * Start recording from the mic.
   * We'll push raw PCM data to `onChunk`.
   */
  public async startRecording(onChunk: (chunk: Uint8Array) => void) {
    if (this.isRecording) return;
    this.isRecording = true;

    // Configure the recording settings.
    // On iOS, you can specify more advanced settings in audioSet if needed.
    const audioSet: AudioSet = {
      AVEncoderAudioQualityKey: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKey: 1,
      AVFormatIDKey: AVEncodingOption.lpcm,
      // The sample rate can be set if supported on device
      AVSampleRateKey: this.sampleRate,
    };

    // Start the recorder. We'll store the file path in case you want to do something
    // with the raw file after recording stops.
    await this.recorderPlayer.startRecorder(undefined, audioSet);

    // `addRecordBackListener` gives us chunked PCM data—BUT note that by default
    // `react-native-audio-recorder-player` might only provide frames in base64 format.
    // The code snippet below is a "mock" of hooking into raw data. You may need
    // to modify the library or implement a custom native module for exact PCM frames.
    //
    // As a fallback, you can just let the library record to a file and
    // read it afterwards if real-time chunk streaming isn't mandatory.
    this.recorderPlayer.addRecordBackListener((e) => {
      // e.currentMetering, e.currentPosition, e.isRecording, etc.

      // We do not get actual PCM frames by default with this library.
      // The snippet below is hypothetical if the library provided raw frames:
      // const pcmInt16Array = somethingThatConverts(e.someRawBuffer);
      // onChunk(new Uint8Array(pcmInt16Array.buffer));

      // For demonstration, we won't pass anything. If you need real-time raw PCM,
      // you might need a different approach or a custom native module.

      return;
    });
  }

  /**
   * Stop recording from the mic.
   */
  public async stopRecording() {
    if (!this.isRecording) return;
    this.isRecording = false;
    await this.recorderPlayer.stopRecorder();
    this.recorderPlayer.removeRecordBackListener();
  }

  /**
   * Start streaming playback mode (we'll queue incoming PCM frames).
   */
  public startStreamingPlayback() {
    this.isPlaying = true;
    this.playbackQueue = [];
  }

  /**
   * Stop streaming playback.
   */
  public stopStreamingPlayback() {
    this.isPlaying = false;
    this.playbackQueue = [];
    // If you used a library method like `stopPlayer()`, call it here.
    // e.g. await this.recorderPlayer.stopPlayer();
  }

  /**
   * Enqueue a PCM chunk (Int16) for playback. 
   * In practice, you'd need to convert the PCM to a .wav or .mp4 file 
   * on the fly and feed it to a player that can handle short appended segments.
   */
  public playChunk(chunk: Uint8Array) {
    if (!this.isPlaying) return;

    const int16Data = new Int16Array(chunk.buffer);

    // *** This step is tricky in React Native. ***  
    // There's no straightforward "AudioContext" that can consume PCM buffers on the fly.
    // Typically you'd:
    //   1) Convert `int16Data` to a short .wav in memory.
    //   2) Write that .wav to a temp file with RNFS.
    //   3) Use `this.recorderPlayer.startPlayer(pathToTempFile)` to play it.
    //   4) Chain them so it doesn't overlap. 
    //
    // This is a rough demonstration below (not production-ready).

    const shortWavFile = this.int16ToWavFile(int16Data);
    // Now shortWavFile is a base64 or binary. Let's say we write it to a temp file:
    const tmpPath = RNFS.DocumentDirectoryPath + `/chunk-${Date.now()}.wav`;

    RNFS.writeFile(tmpPath, shortWavFile, 'base64')
      .then(async () => {
        // Once written, call startPlayer on it
        // If you want them back-to-back, you might need to queue them
        // or wait for onEnd. This library does not natively chain them for you.
        await this.recorderPlayer.startPlayer(tmpPath);
        // optional: Wait for playback to end, then delete the file
        this.recorderPlayer.addPlayBackListener((e) => {
          if (e.currentPosition === e.duration) {
            this.recorderPlayer.stopPlayer();
            RNFS.unlink(tmpPath).catch(() => {});
            this.recorderPlayer.removePlayBackListener();
          }
        });
      })
      .catch((err) => console.error('Error writing WAV chunk', err));
  }

  /**
   * Close audio resources if needed.
   */
  public async close() {
    await this.stopRecording();
    this.stopStreamingPlayback();
    // The library doesn't have a "close()" but you can call stopPlayer if needed
    // this.recorderPlayer.stopPlayer();
  }

  /**
   * EXAMPLE: Convert raw Int16 PCM data to a minimal .wav buffer (Base64).
   * Implementation references:
   *   https://stackoverflow.com/questions/49083060/creating-a-wav-file-from-audio-buffer
   */
  private int16ToWavFile(int16Data: Int16Array): string {
    // Create a WAV header + PCM data as a Uint8Array, then base64-encode it.
    const numChannels = 1;
    const byteRate = this.sampleRate * numChannels * 2; // 16-bit
    const blockAlign = numChannels * 2;
    const dataSize = int16Data.length * 2;
    const totalSize = 44 + dataSize; // 44-byte header

    const buffer = new ArrayBuffer(totalSize);
    const view = new DataView(buffer);

    // RIFF chunk descriptor
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    this.writeString(view, 8, 'WAVE');

    // FMT sub-chunk
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Sub-chunk size (PCM)
    view.setUint16(20, 1, true);  // Audio format (1 = PCM)
    view.setUint16(22, numChannels, true);
    view.setUint32(24, this.sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true); // Bits per sample

    // data sub-chunk
    this.writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    // PCM samples
    let offset = 44;
    for (let i = 0; i < int16Data.length; i++, offset += 2) {
      view.setInt16(offset, int16Data[i], true);
    }

    // Convert to base64
    const uint8Array = new Uint8Array(buffer);
    const base64 = Buffer.from(uint8Array).toString('base64');
    return base64;
  }

  private writeString(view: DataView, offset: number, text: string) {
    for (let i = 0; i < text.length; i++) {
      view.setUint8(offset + i, text.charCodeAt(i));
    }
  }
}
