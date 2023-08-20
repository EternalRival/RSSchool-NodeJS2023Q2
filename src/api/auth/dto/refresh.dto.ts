import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';

export class RefreshDto {
  @ApiProperty({ description: "The user's refreshToken" })
  @IsString()
  public refreshToken: string;

  public refreshTokenPayload: JwtPayloadInterface & {
    iat: number;
    exp: number;
  };
}
