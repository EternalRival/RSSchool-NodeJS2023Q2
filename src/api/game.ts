import { Ship } from '../commands/interfaces/ships/add-ships.request.interface';
import { User } from './user';

export class Game {
  private turnCounter = 0;

  constructor(
    private users: User[],
    private ships: Map<number, Ship[]>,
  ) {}
}
