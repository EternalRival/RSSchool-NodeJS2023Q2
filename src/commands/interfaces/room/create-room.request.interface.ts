import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface CreateRoomRequest extends Omit<SocketMessage, 'data'> {
  data: '';
}
