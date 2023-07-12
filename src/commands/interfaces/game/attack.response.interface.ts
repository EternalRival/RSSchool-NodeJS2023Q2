import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';
import { Position } from '../shared/position.interface';

export type AttackStatus = 'miss' | 'killed' | 'shot';

export interface AttackResponseData {
  position: Position;
  currentPlayer: number /* id of the player in the current game */;
  status: AttackStatus;
}

export interface AttackResponse extends Omit<SocketMessage, 'data'> {
  data: AttackResponseData;
}
