/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entities/user.entity';

export class UserRepository {
  private static users: Map<string, User> = new Map();

  save(user: User): User {
    UserRepository.users.set(user.id, user);
    return user;
  }

  getAll() {
    return Array.from(UserRepository.users.values());
  }

  findOneById(id: string) {
    return UserRepository.users.get(id) ?? null;
  }

  removeById(id: string) {
    return UserRepository.users.delete(id);
  }

  createUUID(): string {
    const uuid = uuidv4();
    return UserRepository.users.has(uuid) ? this.createUUID() : uuid;
  }
}
