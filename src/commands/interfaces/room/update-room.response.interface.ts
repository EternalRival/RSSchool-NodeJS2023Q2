import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';
import { RoomData } from './room-data.interface';

export interface UpdateRoomResponse extends Omit<SocketMessage, 'data'> {
  data: RoomData[];
}
