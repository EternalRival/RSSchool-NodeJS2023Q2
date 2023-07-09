import { OPEN, WebSocket, WebSocketServer } from 'ws';
import { validateClientMessage } from '../socket-message/validators/socket-message.validator';
import { MessageType } from '../socket-message/enums/message-type.enum';
import { Users } from '../api/users.api.service';
import { validateRegData } from './validators/reg.validator';
import { Lobbies } from '../api/lobbies.api.service';
import { WSData } from './interfaces/ws-data.interface';
import { validateAddUserToRoomData } from './validators/add-user-to-room.validator';
import { validateAddShipsData } from './validators/add-ships.validator';

function sendResponse(target: WebSocket | WebSocketServer, type: MessageType, data: object): void {
  if (target instanceof WebSocket && target.readyState === OPEN) {
    const response = JSON.stringify({ type, data: JSON.stringify(data), id: 0 });
    console.log('->', response);
    target.send(response);
  } else if (target instanceof WebSocketServer) {
    target.clients.forEach((client) => sendResponse(client, type, data));
  }
}

function handleReg({ client, server }: WSData, data: string): void {
  const regData = validateRegData(JSON.parse(data));

  let responseData;

  try {
    const user = Users.verifyUser(regData.name, regData.password);
    user.socket = client;

    sendResponse(server, MessageType.UPDATE_ROOM, Lobbies.getOpenLobbyList());
    responseData = { name: user.login, index: user.id, error: false, errorText: '' };
  } catch (err) {
    const errorText = err instanceof Error ? err.message : 'Internal error';
    responseData = { name: regData.name, index: -1, error: true, errorText };
  }

  sendResponse(client, MessageType.REG, responseData);
}

function handleCreateRoom({ client, server }: WSData, data: string): void {
  const player = Users.getUserBySocket(client);
  if (Lobbies.getLobbyByUser(player)) {
    throw new Error('Already the owner of some lobby');
  }
  const lobby = Lobbies.create();

  lobby.addUser(player);
  sendResponse(server, MessageType.UPDATE_ROOM, Lobbies.getOpenLobbyList());
}

function handleAddUserToRoom({ client, server }: WSData, data: string): void {
  const addUserToRoomData = validateAddUserToRoomData(JSON.parse(data));

  const { indexRoom } = addUserToRoomData;
  const lobby = Lobbies.getLobbyById(indexRoom);
  const player = Users.getUserBySocket(client);

  const usersLobby = Lobbies.getLobbyByUser(player);
  if (usersLobby) {
    Lobbies.delete(usersLobby.id);
  }

  lobby.addUser(player);
  sendResponse(server, MessageType.UPDATE_ROOM, Lobbies.getOpenLobbyList());

  if (!lobby.isFull()) {
    return;
  }

  const lobbyUsers = lobby.getUsers();
  if (!lobbyUsers.every((user) => user.socket && user.socket.readyState === WebSocket.OPEN)) {
    return;
  }

  lobbyUsers.forEach((user) => {
    if (user.socket) {
      sendResponse(user.socket, MessageType.CREATE_GAME, { idGame: lobby.id, idPlayer: user.id });
    }
  });
}

function handleAddShips(wsData: WSData, data: string): void {
  const addShipsData = validateAddShipsData(JSON.parse(data));
  const lobby = Lobbies.getLobbyById(addShipsData.gameId);

  lobby.addShips(addShipsData.indexPlayer, addShipsData.ships);

  const lobbyUsers = lobby.getUsers();
  if (!lobbyUsers.every((user) => user.socket && user.socket.readyState === WebSocket.OPEN)) {
    return;
  }

  if (lobby.isReady()) {
    const { id } = lobbyUsers[+(Math.random() < 0.5)];
    lobby.getUsers().forEach((user) => {
      if (user.socket) {
        sendResponse(user.socket, MessageType.START_GAME, {
          ships: lobby.getShips(user.id),
          currentPlayerIndex: id,
        });
      }
    });
  }
}

// TODO хендлить атаки не в свой ход
function handleAttack(wsData: WSData, data: string): void {
  console.log('handleAttack response');
}

function handleRandomAttack(wsData: WSData, data: string): void {
  console.log('handleRandomAttack response');
}

const commands: Map<MessageType, (wsData: WSData, data: string) => void> = new Map([
  [MessageType.REG, handleReg],
  [MessageType.CREATE_ROOM, handleCreateRoom],
  [MessageType.ADD_USER_TO_ROOM, handleAddUserToRoom],
  [MessageType.ADD_SHIPS, handleAddShips],
  [MessageType.ATTACK, handleAttack],
  [MessageType.RANDOM_ATTACK, handleRandomAttack],
]);

function handleCommand(wsData: WSData, command: MessageType, data: string): void {
  const callback = commands.get(command);
  if (!callback) {
    throw new Error('Wrong command');
  }
  callback(wsData, data);
}

export function handleClientMessage(server: WebSocketServer, client: WebSocket, message: unknown): void {
  const socketMessage = validateClientMessage(message);
  const { type, data, id } = socketMessage;
  handleCommand({ server, client }, type, data);
  console.log('<-', type, data, id);
}
