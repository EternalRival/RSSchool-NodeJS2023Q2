import { isObject } from '../../helpers/is-object';
import { MessageType } from '../enums/message-type.enum';
import { SocketMessage } from '../interfaces/socket-message.interface';

function isMessageType(type: unknown): type is MessageType {
  return typeof type === 'string' && (Object.values(MessageType) as string[]).includes(type);
}

function isValidMessage(message: unknown): message is SocketMessage {
  if (isObject(message)) {
    const { type, data, id } = message;
    return typeof type === 'string' && isMessageType(type) && typeof data === 'string' && id === 0;
  }
  return false;
}

export function validateClientMessage(message: unknown): SocketMessage | null {
  return isValidMessage(message) ? message : null;
}
