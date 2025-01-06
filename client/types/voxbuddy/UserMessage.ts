import MessageType from "./MessageType";

export type UserMessage = {
    type: MessageType.USER_MESSAGE;
    text: string;
};