import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { JwtTokensResponseDto } from './dto/jwt-tokens-response.dto';

@Injectable()
export class AuthService {
  private accessTokenOptions: JwtSignOptions;
  private refreshTokenOptions: JwtSignOptions;

  constructor(
    private jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.accessTokenOptions = {
      expiresIn: configService.get('TOKEN_EXPIRE_TIME', '1h'),
      secret: configService.get('JWT_SECRET_KEY', 'secret123123'),
    };
    this.refreshTokenOptions = {
      expiresIn: configService.get('TOKEN_REFRESH_EXPIRE_TIME', '24h'),
      secret: configService.get('JWT_SECRET_REFRESH_KEY', 'secret123123'),
    };
  }

  public async generateTokenPair(
    payload: JwtPayloadDto,
  ): Promise<JwtTokensResponseDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, this.accessTokenOptions),
      this.jwtService.signAsync(payload, this.refreshTokenOptions),
    ]);

    return { accessToken, refreshToken };
  }
}
