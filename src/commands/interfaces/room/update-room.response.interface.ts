import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface UpdateRoomResponse extends Omit<SocketMessage, 'data'> {
  data: {
    roomId: number;
    roomUsers: { name: string; index: number }[];
  }[];
}
// todo check
