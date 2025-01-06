import MessageType from "./MessageType";

export type TextDeltaMessage = {
    id: string
    type: MessageType.TEXT_DELTA
    delta: string
}