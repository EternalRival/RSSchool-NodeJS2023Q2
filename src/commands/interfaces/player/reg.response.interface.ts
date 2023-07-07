import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface RegResponse extends Omit<SocketMessage, 'data'> {
  data: {
    name: string;
    index: number;
    error: boolean;
    errorText: string;
  };
}
