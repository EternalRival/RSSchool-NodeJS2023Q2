import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface CreateGameResponseData {
  idGame: number /* player id in the game */;
  idPlayer: number;
}

export interface CreateGameResponse extends Omit<SocketMessage, 'data'> {
  // send for both players in the room
  data: CreateGameResponseData;
}
