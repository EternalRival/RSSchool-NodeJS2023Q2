import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface CreateGameResponse extends Omit<SocketMessage, 'data'> {
  data: {
    idGame: number /* player id in the game */;
    idPlayer: number;
  };
}
