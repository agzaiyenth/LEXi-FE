import { useRef } from "react";
import { Player } from "./usePlayer";
import { Recorder } from "./useRecorder";
import { WebSocketClient } from "./WebSocketClient";

export const useAudioHandlers = () => {
  const audioPlayerRef = useRef<Player | null>(null);
  const audioRecorderRef = useRef<Recorder | null>(null);

  const initAudioPlayer = async () => {
    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new Player();
      await audioPlayerRef.current.init();
    }
    return audioPlayerRef.current;
  };

  // We start/stop the recorder:
  const handleAudioRecord = async (
    webSocketClient: WebSocketClient | null,
    isRecording: boolean
  ) => {
    if (!isRecording && webSocketClient) {
      if (!audioRecorderRef.current) {
        audioRecorderRef.current = new Recorder(async (buffer) => {
          // Send audio buffer to server
          await webSocketClient.send({ type: 'binary', data: buffer });
        });
      }
      await audioRecorderRef.current.start();
      return true;
    } else if (audioRecorderRef.current) {
      await audioRecorderRef.current.stop();
      audioRecorderRef.current = null;
      return false;
    }
    return isRecording;
  };

  return { audioPlayerRef, audioRecorderRef, initAudioPlayer, handleAudioRecord };
};