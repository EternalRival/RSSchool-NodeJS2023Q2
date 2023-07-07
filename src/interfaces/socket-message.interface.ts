import { MessageType } from "../socket-message/enums/message-type.enum";

export interface SocketMessage {
  type: MessageType;
  data: string;
  id: number;
}
