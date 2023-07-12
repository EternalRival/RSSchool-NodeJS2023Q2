import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface FinishResponseData {
  winPlayer: number;
}

export interface FinishResponse extends Omit<SocketMessage, 'data'> {
  data: FinishResponseData;
}
