import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';
import { Ship } from '../shared/ship.interface';

export interface AddShipsRequestData {
  gameId: number;
  ships: Ship[];
  indexPlayer: number /* id of the player in the current game */;
}

export interface AddShipsRequest extends Omit<SocketMessage, 'data'> {
  data: AddShipsRequestData;
}
