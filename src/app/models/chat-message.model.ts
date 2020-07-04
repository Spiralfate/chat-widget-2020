export class ChatMessage {
  $key?: string;
  // email?: string;
  // userName?: string;
  message?: string;
  timeSent?: Date = new Date();
  userID?: string;
  isAdmin?: boolean;
  image?: number;
}
