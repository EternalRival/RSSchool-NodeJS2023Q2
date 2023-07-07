import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface AddShipsRequest extends Omit<SocketMessage, 'data'> {
  data: {
    gameId: number;
    ships: {
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      length: number;
      type: 'small' | 'medium' | 'large' | 'huge';
    }[];
    indexPlayer: number /* id of the player in the current game */;
  };
}
