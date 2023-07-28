import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DB } from '../fake-db/db.service';
import { v4 } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  usersRepository = DB.usersRepository;

  create({ login, password }: CreateUserDto) {
    const timestamp = Date.now();
    const user = {
      id: v4(),
      login: login,
      password: password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: string, updateData: Partial<User>) {
    const entity = this.usersRepository.findOneBy({ id });
    const version = entity.version + 1;
    const updatedAt = Date.now();
    return this.usersRepository.save({
      ...entity,
      ...updateData,
      version,
      updatedAt,
    });
  }

  remove(id: string) {
    return this.usersRepository.remove({ id });
  }

  cleanPassword(user: User) {
    const clone = structuredClone(user);
    delete clone.password;
    return clone;
  }
}
