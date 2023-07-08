import { RoomData } from './commands/interfaces/room/room-data.interface';
import { User } from './database/user.entity';

export class Room {
  private limit = 2;

  private userList: Map<number, User> = new Map();

  constructor(public id: number) {}

  public addUser(user: User): User {
    if (this.userList.size >= this.limit) {
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

  public getRoomData(): RoomData {
    return {
      roomId: this.id,
      roomUsers: Array.from(this.userList.values(), ({ login, id }) => ({ name: login, index: id })),
    };
  }
}
