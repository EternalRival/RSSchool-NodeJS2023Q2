import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { toNumber } from '../../shared/helpers/to-number';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  private CRYPT_SALT: number;
  private JWT_SECRET_KEY: string;
  private JWT_SECRET_REFRESH_KEY: string;
  private TOKEN_EXPIRE_TIME: string;
  private TOKEN_REFRESH_EXPIRE_TIME: string;

  constructor(
    private usersService: UsersService,
    configService: ConfigService,
  ) {
    this.CRYPT_SALT = toNumber(configService.get('CRYPT_SALT')) ?? 10;
    this.JWT_SECRET_KEY = configService.get('JWT_SECRET_KEY', 'secret123123');
    this.JWT_SECRET_REFRESH_KEY = configService.get(
      'JWT_SECRET_REFRESH_KEY',
      'secret123123',
    );
    this.TOKEN_EXPIRE_TIME = configService.get('TOKEN_EXPIRE_TIME', '1h');
    this.TOKEN_REFRESH_EXPIRE_TIME = configService.get(
      'TOKEN_REFRESH_EXPIRE_TIME',
      '24h',
    );
  }
  /* 
  public async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // jwt

    return result;
  } 
  */

  public async signUp({ login, password }: SignUpDto): Promise<User> {
    const entity = { login, password: await hash(password, this.CRYPT_SALT) };
    return this.usersService.create(entity);
  }

  public login() {}

  public refresh() {}
}
