import { User } from './entities/user.entity';
import { UserRepository } from './users/users.repository';

export class AppService {
  userRepository = new UserRepository();

  create(user: User): User {
    const uuid = this.userRepository.createUUID();
    return this.userRepository.save(Object.assign(user, { id: uuid }));
  }

  findAll(): User[] {
    return this.userRepository.getAll();
  }

  findOneById(id: string): User | null {
    return this.userRepository.findOneById(id);
  }

  update(user: User) {
    const entity = this.userRepository.findOneById(user.id);
    if (!entity) throw new Error('User not found');
    return this.userRepository.save(user);
  }

  remove(id: string) {
    this.userRepository.removeById(id);
  }
}
