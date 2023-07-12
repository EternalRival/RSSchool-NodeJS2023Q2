import { WSData } from '../interfaces/ws-data.interface';
import { validateAttackData } from '../validators/attack.validator';

// TODO хендлить атаки не в свой ход
export function handleAttack(_wsData: WSData, data: string): void {
  const attackData = validateAttackData(JSON.parse(data));
}
