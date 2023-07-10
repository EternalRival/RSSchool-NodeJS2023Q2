import { SocketMessage } from '../socket-message/interfaces/socket-message.interface';

function cyan(str: string): string {
  return `\x1b[36m${str}\x1b[0m`;
}
function green(str: string): string {
  return `\x1b[32m${str}\x1b[0m`;
}

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
