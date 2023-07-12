import { WSData } from '../interfaces/ws-data.interface';

export function handleRandomAttack(_wsData: WSData, _data: string): void {
  throw new Error('handleRandomAttack  not implemented');
  console.log(_wsData, _data);
}
