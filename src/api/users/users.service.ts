import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { toNumber } from '../../shared/helpers/to-number';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  private CRYPT_SALT: number;

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    configService: ConfigService,
  ) {
    this.CRYPT_SALT = toNumber(configService.get('CRYPT_SALT')) ?? 10;
  }

  public async create({ login, password }: CreateUserDto): Promise<User> {
    const entity = { login, password: await this.hashPassword(password) };
    return this.usersRepository.save(entity);
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

    if (updateData.password) {
      updateData.password = await this.hashPassword(updateData.password);
    }

    return this.usersRepository.save({ ...entity, ...updateData });
  }

  public remove(user: User): Promise<User> {
    return this.usersRepository.remove(user);
  }

  public hashPassword(password: string): Promise<string> {
    return hash(password, this.CRYPT_SALT);
  }

  public verifyPassword(user: User, password: string): Promise<boolean> {
    return compare(password, user.password);
  }
}
