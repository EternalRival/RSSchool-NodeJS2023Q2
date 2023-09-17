import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { JwtPayloadDto } from './jwt-payload.dto';

export class RefreshDto {
  @ApiProperty({ description: "The user's refreshToken" })
  @IsString()
  public refreshToken: string;

  @IsOptional()
  public refreshTokenPayload: JwtPayloadDto & {
    iat: number;
    exp: number;
  };
}
