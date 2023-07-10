import { WebSocket } from 'ws';
import { MessageType } from '../../socket-message/enums/message-type.enum';
import { Users } from '../../api/users';
import { Lobbies } from '../../api/lobbies';
import { WSData } from '../interfaces/ws-data.interface';
import { validateAddUserToRoomData } from '../validators/add-user-to-room.validator';
import { sendResponse } from '../send-response';

export function handleAddUserToRoom({ client, server }: WSData, data: string): void {
  const addUserToRoomData = validateAddUserToRoomData(JSON.parse(data));

  const lobby = Lobbies.getLobbyById(addUserToRoomData.indexRoom);
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
