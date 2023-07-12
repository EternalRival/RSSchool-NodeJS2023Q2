import { SocketMessage } from '../../../socket-message/interfaces/socket-message.interface';

export interface RegResponseData {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

export interface RegResponse extends Omit<SocketMessage, 'data'> {
  data: RegResponseData;
}
