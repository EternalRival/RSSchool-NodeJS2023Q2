import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export type CreateRoomRequestData = '';

export interface CreateRoomRequest extends Omit<SocketMessage, 'data'> {
  data: CreateRoomRequestData;
}
