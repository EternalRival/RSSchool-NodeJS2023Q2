import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface Winner {
  name: string;
  wins: number;
}

export type UpdateWinnersResponseData = Winner[];

export interface UpdateWinnersResponse extends Omit<SocketMessage, 'data'> {
  data: UpdateWinnersResponseData;
}
