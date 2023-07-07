import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface AttackRequest extends Omit<SocketMessage, 'data'> {
  data: {
    gameID: number;
    x: number;
    y: number;
    indexPlayer: number /* id of the player in the current game */;
  };
}
