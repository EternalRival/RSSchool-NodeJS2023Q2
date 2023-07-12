import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface TurnResponseData {
  currentPlayer: number;
}

export interface TurnResponse extends Omit<SocketMessage, 'data'> {
  data: TurnResponseData;
}
