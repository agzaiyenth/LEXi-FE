import MessageType from "./MessageType";


export interface ControlMessage {
type: MessageType.CONTROL;
action: string;
greeting?: string;
id?: string;
}