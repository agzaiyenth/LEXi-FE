import MessageType from "./MessageType";

export type TranscriptionMessage = 
{
    id: string;
    type: MessageType.TRANSCRIPTION;
    text: string;
}