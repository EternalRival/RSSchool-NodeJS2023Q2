import { WebSocket } from 'ws';
import { Ship } from '../commands/interfaces/shared/ship.interface';
import { sendResponse } from '../commands/send-response';
import { MessageType } from '../socket-message/enums/message-type.enum';
import { User } from './user';
import { Game } from './game';
import { RoomData } from '../commands/interfaces/room/update-room.response.interface';
import { AttackRequestData } from '../commands/interfaces/game/attack.request.interface';
import { RoomIsFullError } from '../errors/room-is-full.error';
import { AlreadyInRoomError } from '../errors/already-in-room.error';
import { PlayerDisconnectedError } from '../errors/player-disconnected.error';
import { NotFoundError } from '../errors/not-found.error';
import { NotEnoughPlayersError } from '../errors/not-enough-players.error';

export class Lobby {
  private limit = 2;

  private users: Map<number, User> = new Map();

  private ships: Map<number, Ship[]> = new Map();

  private game?: Game;

  constructor(public id: number) {}

  public addUser(user: User): User {
    if (this.isFull()) {
      throw new RoomIsFullError();
    }
    if (this.users.has(user.id)) {
      throw new AlreadyInRoomError();
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
      throw new PlayerDisconnectedError();
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
  }

  public getShipsByPlayerId(playerId: number): Ship[] {
    const ships = this.ships.get(playerId);
    if (!ships) {
      throw new NotFoundError('Ships');
    }
    return ships;
  }

  public createGame(): void {
    if (!this.isFull()) {
      throw new NotEnoughPlayersError();
    }

    const lobbyUsers = Array.from(this.users.values());
    if (!lobbyUsers.every((user) => user.socket && user.socket.readyState === WebSocket.OPEN)) {
      throw new PlayerDisconnectedError();
    }

    lobbyUsers.forEach((user) => {
      if (user.socket) {
        sendResponse(user.socket, MessageType.CREATE_GAME, { idGame: this.id, idPlayer: user.id });
      }
    });
  }

  public handleAttack(attackData: AttackRequestData): void {
    if (!this.game) {
      throw new NotFoundError('Game');
    }
    this.game.handleAttack(attackData);
  }
}
