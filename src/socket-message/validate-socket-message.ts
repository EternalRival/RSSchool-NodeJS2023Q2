import { MessageType } from './enums/message-type.enum';
import { SocketMessage } from './interfaces/socket-message.interface';

function isMessageType(type: unknown): boolean {
  return typeof type === 'string' && (Object.values(MessageType) as string[]).includes(type);
}

function isValidMessage(message: unknown): message is SocketMessage {
  if (message !== null && typeof message === 'object') {
    const obj = message as Record<string, unknown>;
    const { type, data, id } = obj;
    return typeof type === 'string' && isMessageType(type) && typeof data === 'string' && typeof id === 'number';
  }
  return false;
}

export function validateClientMessage(message: unknown): SocketMessage | null {
  return isValidMessage(message) ? message : null;
}
