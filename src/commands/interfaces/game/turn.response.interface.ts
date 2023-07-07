import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface TurnResponse extends Omit<SocketMessage, 'data'> {
  data: {
    currentPlayer: number;
  };
}
