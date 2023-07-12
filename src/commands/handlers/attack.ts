import { Lobbies } from '../../api/lobbies';
import { WSData } from '../interfaces/ws-data.interface';
import { validateAttackData } from '../validators/attack.validator';

export function handleAttack(_wsData: WSData, data: string): void {
  const attackData = validateAttackData(JSON.parse(data));

  const lobby = Lobbies.getLobbyById(attackData.gameId);

  lobby.handleAttack(attackData);
}
