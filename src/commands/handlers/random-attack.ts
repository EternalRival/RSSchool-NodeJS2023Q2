import { NotImplementedError } from '../../errors/not-implemented.error';
import { WSData } from '../interfaces/ws-data.interface';

export function handleRandomAttack(_wsData: WSData, _data: string): void {
  throw new NotImplementedError('handleRandomAttack');
  console.log(_wsData, _data);
}
