import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public create(createUserDto: CreateUserDto): Promise<User> {
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

  public findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  public async update(
    id: string,
    updateData: Partial<User>,
  ): Promise<User | null> {
    const entity: User | null = await this.usersRepository.findOneBy({ id });

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

  public remove(user: User): Promise<User> {
    return this.usersRepository.remove(user);
  }
}
