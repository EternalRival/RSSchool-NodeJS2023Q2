import { WebSocket } from 'ws';
import { MessageType } from '../../socket-message/enums/message-type.enum';
import { Lobbies } from '../../api/lobbies';
import { WSData } from '../interfaces/ws-data.interface';
import { validateAddShipsData } from '../validators/add-ships.validator';
import { sendResponse } from '../send-response';

export function handleAddShips(_wsData: WSData, data: string): void {
  const addShipsData = validateAddShipsData(JSON.parse(data));
  const lobby = Lobbies.getLobbyById(addShipsData.gameId);

  lobby.addShips(addShipsData.indexPlayer, addShipsData.ships);

  const lobbyUsers = lobby.getUsers();
  const areSocketsReady = lobbyUsers.every((user) => user.socket?.readyState === WebSocket.OPEN);

  if (areSocketsReady && lobby.isReady()) {
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
