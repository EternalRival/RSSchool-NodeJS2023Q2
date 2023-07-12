import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface RegRequestData {
  name: string;
  password: string;
}

export interface RegRequest extends Omit<SocketMessage, 'data'> {
  data: RegRequestData;
}
