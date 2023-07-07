import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface FinishResponse extends Omit<SocketMessage, 'data'> {
  data: {
    winPlayer: number;
  };
}
