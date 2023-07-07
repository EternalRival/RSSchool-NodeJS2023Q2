import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface RegRequest extends Omit<SocketMessage, 'data'> {
  data: {
    name: string;
    password: string;
  };
}
