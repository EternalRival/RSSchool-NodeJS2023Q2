import { WebSocket, WebSocketServer } from 'ws';
import { validateClientMessage } from '../socket-message/validators/socket-message.validator';
import { MessageType } from '../socket-message/enums/message-type.enum';
import { WSData } from './interfaces/ws-data.interface';
import { logRequest } from '../helpers/log';
import { handleReg } from './handlers/reg';
import { handleCreateRoom } from './handlers/create-room';
import { handleAddUserToRoom } from './handlers/add-user-to-room';
import { handleAddShips } from './handlers/add-ships';
import { handleAttack } from './handlers/attack';
import { handleRandomAttack } from './handlers/random-attack';

const commands: Map<MessageType, (wsData: WSData, data: string) => void> = new Map([
  [MessageType.REG, handleReg],
  [MessageType.CREATE_ROOM, handleCreateRoom],
  [MessageType.ADD_USER_TO_ROOM, handleAddUserToRoom],
  [MessageType.ADD_SHIPS, handleAddShips],
  [MessageType.ATTACK, handleAttack],
  [MessageType.RANDOM_ATTACK, handleRandomAttack],
]);

export function handleClientMessage(server: WebSocketServer, client: WebSocket, message: unknown): void {
  const clientMessage = validateClientMessage(message);

  const callback = commands.get(clientMessage.type);
  if (!callback) {
    throw new Error('Wrong command');
  }
  callback({ server, client }, clientMessage.data);

  logRequest(clientMessage);
}
