/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entities/user.entity';

export class UserRepository {
  private static users: Map<string, User> = new Map();

  public save(user: User): User {
    UserRepository.users.set(user.id, user);
    return user;
  }

  public getAll(): User[] {
    return Array.from(UserRepository.users.values());
  }

  public findOneById(id: string): User | null {
    return UserRepository.users.get(id) ?? null;
  }

  public removeById(id: string): boolean {
    return UserRepository.users.delete(id);
  }

  public createUUID(): string {
    const uuid = uuidv4();
    return UserRepository.users.has(uuid) ? this.createUUID() : uuid;
  }
}
