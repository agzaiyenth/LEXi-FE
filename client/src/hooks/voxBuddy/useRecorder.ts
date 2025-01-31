import { Audio } from "expo-av";

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