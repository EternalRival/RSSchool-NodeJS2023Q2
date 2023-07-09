import { RoomData } from '../commands/interfaces/room/room-data.interface';
import { Ship } from '../commands/interfaces/ships/add-ships.request.interface';
import { User } from './user.entity';

export class Lobby {
  private limit = 2;

  private userList: Map<number, User> = new Map();

  private ships: Map<number, Ship[]> = new Map();

  constructor(public id: number) {}

  public addUser(user: User): User {
    if (this.isFull()) {
      throw new Error('Room is full');
    }
    if (this.userList.has(user.id)) {
      throw new Error('User already in room');
    }
    this.userList.set(user.id, user);
    return user;
  }

  public removeUser(id: number): User {
    const user = this.userList.get(id);
    if (!user) {
      throw new Error('User not found');
    }
    this.userList.delete(user.id);
    return user;
  }

  public getLobbyData(): RoomData {
    return {
      roomId: this.id,
      roomUsers: Array.from(this.userList.values(), ({ login, id }) => ({ name: login, index: id })),
    };
  }

  public hasUser(user: User): boolean {
    return this.userList.has(user.id);
  }

  public isFull(): boolean {
    return this.userList.size >= this.limit;
  }

  public isReady(): boolean {
    return this.ships.size >= this.limit;
  }

  public getUsers(): User[] {
    return Array.from(this.userList.values());
  }

  public addShips(playerId: number, shipsData: Ship[]): void {
    this.ships.set(playerId, shipsData);
  }

  public getShips(playerId: number): Ship[] {
    const ships = this.ships.get(playerId);
    if (!ships) {
      throw new Error('Ships not found');
    }
    return ships;
  }
}
