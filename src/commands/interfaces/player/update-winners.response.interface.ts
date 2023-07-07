import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface UpdateWinnersResponse extends Omit<SocketMessage, 'data'> {
  data: { name: string; wins: number }[];
}
