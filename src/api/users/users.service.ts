import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  public findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public findOne(where: FindOptionsWhere<User>): Promise<User | null> {
    return this.usersRepository.findOneBy(where);
  }

  public async update(
    id: string,
    updateData: Partial<User>,
  ): Promise<User | null> {
    const entity: User | null = await this.usersRepository.findOneBy({ id });

    if (!entity) {
      return null;
    }

    return this.usersRepository.save({ ...entity, ...updateData });
  }

  public remove(user: User): Promise<User> {
    return this.usersRepository.remove(user);
  }
}
