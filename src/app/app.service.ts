import { User } from './entities/user.entity';
import { UserInterface } from './interfaces/user.interface';
import { UserRepository } from './users/users.repository';

export class AppService {
  private userRepository = new UserRepository();

  public createUser({ username, age, hobbies }: Omit<UserInterface, 'id'>): User {
    const id = this.userRepository.createUUID();
    const user = new User(id, username, age, hobbies);
    return this.userRepository.save(user);
  }

  public findAll(): User[] {
    return this.userRepository.getAll();
  }

  public findOneById(id: string): User | null {
    return this.userRepository.findOneById(id);
  }

  public updateUser({ id, username, age, hobbies }: UserInterface): User {
    const entity = this.userRepository.findOneById(id);
    if (!entity) {
      throw new Error('User not found');
    }
    return this.userRepository.save({ id, username, age, hobbies });
  }

  public remove(id: string): void {
    this.userRepository.removeById(id);
  }
}
