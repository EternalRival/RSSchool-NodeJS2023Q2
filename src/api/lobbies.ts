import { RoomData } from '../commands/interfaces/room/room-data.interface';
import { User } from './user';
import { Counter } from '../helpers/counter';
import { Lobby } from './lobby';

export class Lobbies {
  private static id = new Counter();

  public static list: Map<number, Lobby> = new Map();

  public static create(): Lobby {
    const room = new Lobby(this.id.next());
    this.list.set(room.id, room);
    return room;
  }

  public static delete(id: number): Lobby {
    const room = this.list.get(id);
    if (!room) {
      throw new Error('Wrong room id');
    }
    this.list.delete(room.id);
    return room;
  }

  public static getOpenLobbyList(): RoomData[] {
    return Array.from(this.list.values())
      .filter((v) => !v.isFull())
      .map((v) => v.getLobbyData());
  }

  public static getLobbyById(id: number): Lobby {
    const room = this.list.get(id);

    if (!room) {
      throw new Error('Wrong room id');
    }
    return room;
  }

  public static getLobbyByUser(user: User): Lobby | undefined {
    return Array.from(this.list.values()).find((lobby) => lobby.hasUser(user));
  }
}
