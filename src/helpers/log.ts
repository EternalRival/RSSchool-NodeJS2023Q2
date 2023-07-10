import { SocketMessage } from '../socket-message/interfaces/socket-message.interface';
import { cyan, green, red } from './colorize';

function logMessage(message: SocketMessage, isServerMessage: boolean): void {
  const [from, to] = (isServerMessage ? ['[Server]', 'client'] : ['[Client]', 'server']).map(cyan);
  const [type, data] = [message.type, message.data].map(green);
  console.log(from, `send ${type} message to ${to} with data: ${data}`);
}

export function logRequest(message: SocketMessage): void {
  logMessage(message, false);
}

export function logResponse(message: SocketMessage): void {
  logMessage(message, true);
}

export function logError(err: unknown): void {
  console.error(cyan('[Server]'), err instanceof Error ? red(err.message) : err);
}
