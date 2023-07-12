import { WebSocket } from 'ws';
import { Ship } from '../commands/interfaces/shared/ship.interface';
import { sendResponse } from '../commands/send-response';
import { MessageType } from '../socket-message/enums/message-type.enum';
import { User } from './user';
import { Game } from './game';
import { RoomData } from '../commands/interfaces/room/update-room.response.interface';

export class Lobby {
  private limit = 2;

  private users: Map<number, User> = new Map();

  private ships: Map<number, Ship[]> = new Map();

  private game?: Game;

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

  public addShips(playerId: number, shipsData: Ship[]): void {
    this.ships.set(playerId, shipsData);

    if (this.ships.size < this.limit) {
      return;
    }

    const lobbyUsers = Array.from(this.users.values());
    if (!lobbyUsers.every((user) => user.socket && user.socket.readyState === WebSocket.OPEN)) {
      throw new Error('Some player was disconnected');
    }

    if (Math.random() < 0.5) {
      lobbyUsers.reverse();
    }
    lobbyUsers.forEach((user) => {
      if (!user.socket) {
        return;
      }
      sendResponse(user.socket, MessageType.START_GAME, {
        ships: this.getShipsByPlayerId(user.id),
        currentPlayerIndex: playerId,
      });
    });

    this.game = new Game(lobbyUsers, this.ships);
    this.game.sendTurn();
  }

  public getShipsByPlayerId(playerId: number): Ship[] {
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

    const lobbyUsers = Array.from(this.users.values());
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
