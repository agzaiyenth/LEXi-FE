export interface Message {
    id: string;
    type: 'user' | 'assistant';
    content: string;
  }
  
  export type WSControlAction = 'speech_started' | 'connected' | 'text_done' | 'status';
  
  export interface WSMessage {
    id?: string;
    type: 'text_delta' | 'transcription' | 'user_message' | 'control';
    delta?: string;
    text?: string;
    action?: WSControlAction;
    greeting?: string;
  }
  
  export interface BinaryWebSocketMessage {
    type: "binary";
    data: ArrayBuffer;
  }
  
 export  interface TextWebSocketMessage {
    type: "text";
    data: string;
  }
  
  export type WebSocketMessage = BinaryWebSocketMessage | TextWebSocketMessage;
  