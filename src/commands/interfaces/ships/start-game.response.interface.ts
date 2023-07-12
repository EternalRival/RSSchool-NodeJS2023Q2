import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';
import { Ship } from '../shared/ship.interface';

export interface StartGameResponseData {
  ships: Ship[];
  currentPlayerIndex: number /* id of the player in the current game who have sent his ships */;
}

export interface StartGameResponse extends Omit<SocketMessage, 'data'> {
  data: StartGameResponseData;
}
