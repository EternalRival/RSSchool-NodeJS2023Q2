import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface RandomAttackRequest extends Omit<SocketMessage, 'data'> {
  data: {
    gameID: number;
    indexPlayer: number /* id of the player in the current game */;
  };
}
