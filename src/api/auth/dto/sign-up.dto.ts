import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ description: "The user's login" })
  @IsString()
  public login: string;

  @ApiProperty({ description: "The user's password" })
  @IsString()
  public password: string;
}
