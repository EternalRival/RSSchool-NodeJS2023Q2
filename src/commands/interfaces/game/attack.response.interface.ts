import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface AttackResponse extends Omit<SocketMessage, 'data'> {
  data: {
    position: {
      x: number;
      y: number;
    };
    currentPlayer: number /* id of the player in the current game */;
    status: 'miss' | 'killed' | 'shot';
  };
}
