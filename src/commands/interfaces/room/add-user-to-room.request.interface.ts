import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface AddUserToRoomRequestData {
  indexRoom: number;
}

export interface AddUserToRoomRequest extends Omit<SocketMessage, 'data'> {
  data: AddUserToRoomRequestData;
}
