import { WebSocket, WebSocketServer } from 'ws';
import { validateClientMessage } from '../socket-message/socket-message.validator';
import { MessageType } from '../socket-message/enums/message-type.enum';
import { Database } from '../database/storage-api';
import { validateRegData } from './reg.validator';
import { RegResponse } from './interfaces/player/reg.response.interface';

function handleReg(data: string): RegResponse['data'] {
  const regData = validateRegData(JSON.parse(data));
  if (!regData) {
    throw new Error('Invalid reg data');
  }
  try {
    const user = Database.verifyUser(regData.name, regData.password);
    return { name: user.login, index: user.id, error: false, errorText: '' };
  } catch (err) {
    const errorText = err instanceof Error ? err.message : 'Internal error';
    return { name: regData.name, index: -1, error: true, errorText };
  }
}

function handleCreateRoom(data: string): object {
  const response = 'handleCreateRoom response';
  return { response };
}
function handleAddUserToRoom(data: string): object {
  const response = 'handleAddUserToRoom response';
  return { response };
}
function handleAddShips(data: string): object {
  const response = 'handleAddShips response';
  return { response };
}
function handleAttack(data: string): object {
  const response = 'handleAttack response';
  return { response };
}
function handleRandomAttack(data: string): object {
  const response = 'handleRandomAttack response';
  return { response };
}

const commands: Map<MessageType, (data: string) => object> = new Map([
  [MessageType.REG, handleReg],
  [MessageType.CREATE_ROOM, handleCreateRoom],
  [MessageType.ADD_USER_TO_ROOM, handleAddUserToRoom],
  [MessageType.ADD_SHIPS, handleAddShips],
  [MessageType.ATTACK, handleAttack],
  [MessageType.RANDOM_ATTACK, handleRandomAttack],
]);

function handleCommand(command: MessageType, data: string): string {
  const callback = commands.get(command);
  if (!callback) {
    throw new Error('Wrong command');
  }
  return JSON.stringify({ type: command, data: JSON.stringify(callback(data)), id: 0 });
}

export function handleClientMessage(server: WebSocketServer, client: WebSocket, message: unknown): void {
  const socketMessage = validateClientMessage(message);
  if (!socketMessage) {
    throw new Error('wrong socket message');
  }
  const { type, data, id } = socketMessage;
  const responseData = handleCommand(type, data);
  console.log('<-', type, data, id);
  console.log('->', responseData);
  client.send(responseData);
}
