import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface RandomAttackRequestData {
  gameID: number;
  indexPlayer: number /* id of the player in the current game */;
}

export interface RandomAttackRequest extends Omit<SocketMessage, 'data'> {
  data: RandomAttackRequestData;
}
