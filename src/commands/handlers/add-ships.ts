import { Lobbies } from '../../api/lobbies';
import { WSData } from '../interfaces/ws-data.interface';
import { validateAddShipsData } from '../validators/add-ships.validator';

export function handleAddShips(_wsData: WSData, data: string): void {
  const addShipsData = validateAddShipsData(JSON.parse(data));
  const lobby = Lobbies.getLobbyById(addShipsData.gameId);

  lobby.addShips(addShipsData.indexPlayer, addShipsData.ships);
}
