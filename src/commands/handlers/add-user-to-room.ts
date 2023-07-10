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

  lobby.addUser(player);
  Lobbies.pruneUserFromAnotherLobbies(lobby, player);
  sendResponse(server, MessageType.UPDATE_ROOM, Lobbies.getOpenLobbyList());

  lobby.createGame();
}
