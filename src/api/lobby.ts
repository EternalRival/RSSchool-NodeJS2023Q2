import { WebSocket } from 'ws';
import { RoomData } from '../commands/interfaces/room/room-data.interface';
import { Ship } from '../commands/interfaces/ships/add-ships.request.interface';
import { sendResponse } from '../commands/send-response';
import { MessageType } from '../socket-message/enums/message-type.enum';
import { User } from './user';

export class Lobby {
  private limit = 2;

  private users: Map<number, User> = new Map();

  private ships: Map<number, Ship[]> = new Map();

  constructor(public id: number) {}

  public addUser(user: User): User {
    if (this.isFull()) {
      throw new Error('Room is full');
    }
    if (this.users.has(user.id)) {
      throw new Error('User already in room');
    }
    this.users.set(user.id, user);
    return user;
  }

  public removeUser(id: number): User {
    const user = this.users.get(id);
    if (!user) {
      throw new Error('User not found');
    }
    this.users.delete(user.id);
    return user;
  }

  public getLobbyData(): RoomData {
    return {
      roomId: this.id,
      roomUsers: Array.from(this.users.values(), ({ login, id }) => ({ name: login, index: id })),
    };
  }

  public hasUser(user: User): boolean {
    return this.users.has(user.id);
  }

  public isFull(): boolean {
    return this.users.size >= this.limit;
  }

  public isReady(): boolean {
    return this.ships.size >= this.limit;
  }

  public getUsers(): User[] {
    return Array.from(this.users.values());
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

  public createGame(): void {
    if (!this.isFull()) {
      throw new Error('Not enough players to start game');
    }

    const lobbyUsers = this.getUsers();
    if (!lobbyUsers.every((user) => user.socket && user.socket.readyState === WebSocket.OPEN)) {
      throw new Error('Some player was disconnected');
    }

    lobbyUsers.forEach((user) => {
      if (user.socket) {
        sendResponse(user.socket, MessageType.CREATE_GAME, { idGame: this.id, idPlayer: user.id });
      }
    });
  }
}
