import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface AddUserToRoomRequest extends Omit<SocketMessage, 'data'> {
  data: { indexRoom: number };
}
