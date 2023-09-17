import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';
import { Position } from '../shared/position.interface';

export interface AttackRequestData extends Position {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number /* id of the player in the current game */;
}

export interface AttackRequest extends Omit<SocketMessage, 'data'> {
  data: AttackRequestData;
}
