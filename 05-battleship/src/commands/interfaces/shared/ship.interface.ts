import { Position } from './position.interface';

export type ShipType = 'small' | 'medium' | 'large' | 'huge';

export interface Ship {
  position: Position;
  direction: boolean;
  length: number;
  type: ShipType;
}
