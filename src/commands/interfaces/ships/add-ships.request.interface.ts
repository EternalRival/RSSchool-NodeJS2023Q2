import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface Ship {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

export interface AddShipsRequest extends Omit<SocketMessage, 'data'> {
  data: {
    gameId: number;
    ships: Ship[];
    indexPlayer: number /* id of the player in the current game */;
  };
}
