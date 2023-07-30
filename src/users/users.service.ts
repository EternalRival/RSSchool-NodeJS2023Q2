import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DB } from '../fake-db/db.service';
import { v4 } from 'uuid';
import { User } from './entities/user.entity';
import { Repository } from '../fake-db/repository.service';

@Injectable()
export class UsersService {
  private usersRepository: Repository<User> = DB.usersRepository;

  public create(createUserDto: CreateUserDto): User {
    const timestamp = Date.now();
    const user = {
      ...createUserDto,
      id: v4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    return this.usersRepository.save(user);
  }

  public findAll(): User[] {
    return this.usersRepository.find();
  }

  public findOne(id: string): User | null {
    return this.usersRepository.findOneBy({ id });
  }

  public update(id: string, updateData: Partial<User>): User | null {
    const entity: User | null = this.usersRepository.findOneBy({ id });

    if (!entity) {
      return null;
    }

    const version = entity.version + 1;
    const updatedAt = Date.now();
    return this.usersRepository.save({
      ...entity,
      ...updateData,
      version,
      updatedAt,
    });
  }

  public remove(user: User): User {
    return this.usersRepository.remove(user);
  }
}
