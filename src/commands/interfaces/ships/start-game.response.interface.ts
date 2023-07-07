import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface StartGameResponse extends Omit<SocketMessage, 'data'> {
  data: {
    ships: {
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      length: number;
      type: 'small' | 'medium' | 'large' | 'huge';
    }[];
    currentPlayerIndex: number /* id of the player in the current game who have sent his ships */;
  };
}
