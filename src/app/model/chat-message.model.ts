export class ChatMessage {
    key?: string;
    email?: string;
    userName?: string;
    message?: string;
    timeSent?: Date = new Date();
    fileName?: string;
    type?: string;
    url?: string;
}
