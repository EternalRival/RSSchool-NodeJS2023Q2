import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface RoomUser {
  name: string;
  index: number;
}

export interface RoomData {
  roomId: number;
  roomUsers: RoomUser[];
}

export type UpdateRoomResponseData = RoomData[];

export interface UpdateRoomResponse extends Omit<SocketMessage, 'data'> {
  data: UpdateRoomResponseData;
}
