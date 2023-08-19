import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { compare, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { toNumber } from '../../shared/helpers/to-number';
import { User } from '../users/entities/user.entity';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private CRYPT_SALT: number;

  private accessTokenOptions: JwtSignOptions;
  private refreshTokenOptions: JwtSignOptions;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.CRYPT_SALT = toNumber(configService.get('CRYPT_SALT')) ?? 10;

    this.accessTokenOptions = {
      expiresIn: configService.get('TOKEN_EXPIRE_TIME', '1h'),
      secret: configService.get('JWT_SECRET_KEY', 'secret123123'),
    };
    this.refreshTokenOptions = {
      expiresIn: configService.get('TOKEN_REFRESH_EXPIRE_TIME', '24h'),
      secret: configService.get('JWT_SECRET_REFRESH_KEY', 'secret123123'),
    };
  }

  public async signUp({ login, password }: SignUpDto): Promise<User> {
    const entity = { login, password: await hash(password, this.CRYPT_SALT) };
    return this.usersService.create(entity);
  }

  public getUserByLogin(login: string): Promise<User | null> {
    return this.usersService.findOne({ login });
  }

  public verifyPassword(user: User, password: string): Promise<boolean> {
    return compare(password, user.password);
  }

  public async login({ id, login }: User) {
    const payload = { userId: id, login };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, this.accessTokenOptions),
      this.jwtService.signAsync(payload, this.refreshTokenOptions),
    ]);

    return { accessToken, refreshToken };
  }

  public refresh() {}
}
