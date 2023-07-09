import { RoomData } from '../commands/interfaces/room/room-data.interface';
import { User } from './user.entity';
import { Counter } from '../helpers/counter';
import { Room } from './room.entity';

export class Lobbies {
  private static id = new Counter();

  private static list: Map<number, Room> = new Map();

  public static create(): Room {
    const room = new Room(this.id.next());
    this.list.set(room.id, room);
    return room;
  }

  public static delete(id: number): Room {
    const room = this.list.get(id);
    if (!room) {
      throw new Error('Wrong room id');
    }
    this.list.delete(room.id);
    return room;
  }

  public static getOpenRoomList(): RoomData[] {
    return Array.from(this.list.values())
      .filter((v) => !v.isFull())
      .map((v) => v.getRoomData());
  }

  public static getRoomById(id: number): Room {
    const room = this.list.get(id);
    if (!room) {
      throw new Error('Wrong room id');
    }
    return room;
  }

  public static getUsersLobby(user: User): Room | undefined {
    return Array.from(this.list.values()).find((lobby) => lobby.hasUser(user));
  }
}
