import { User } from './entities/user.entity';
import { UserInterface } from './interfaces/user.interface';
import { UserRepository } from './users/users.repository';

export class AppService {
  userRepository = new UserRepository();

  createUser({ username, age, hobbies }: Omit<UserInterface, 'id'>): User {
    const id = this.userRepository.createUUID();
    const user = new User(id, username, age, hobbies);
    return this.userRepository.save(user);
  }

  findAll(): User[] {
    return this.userRepository.getAll();
  }

  findOneById(id: string): User | null {
    return this.userRepository.findOneById(id);
  }

  updateUser({ id, username, age, hobbies }: UserInterface) {
    const entity = this.userRepository.findOneById(id);
    if (!entity) throw new Error('User not found');
    return this.userRepository.save({ id, username, age, hobbies });
  }

  remove(id: string) {
    this.userRepository.removeById(id);
  }
}
