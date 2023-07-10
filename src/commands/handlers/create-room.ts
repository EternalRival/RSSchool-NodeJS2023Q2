import { MessageType } from '../../socket-message/enums/message-type.enum';
import { Users } from '../../api/users';
import { Lobbies } from '../../api/lobbies';
import { WSData } from '../interfaces/ws-data.interface';
import { sendResponse } from '../send-response';

export function handleCreateRoom({ client, server }: WSData): void {
  const player = Users.getUserBySocket(client);
  if (Lobbies.getLobbyByUser(player)) {
    throw new Error('Already the owner of some lobby');
  }
  const lobby = Lobbies.create();

  lobby.addUser(player);
  sendResponse(server, MessageType.UPDATE_ROOM, Lobbies.getOpenLobbyList());
}
