import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({ description: "The user's refreshToken" })
  @IsString()
  refreshToken: string;
}
