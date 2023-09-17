import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

interface CreateUserDtoInterface {
  login: string;
  password: string;
}

export class CreateUserDto implements CreateUserDtoInterface {
  @ApiProperty({ description: "The user's login" })
  @IsString()
  public login: string;

  @ApiProperty({ description: "The user's password" })
  @IsString()
  public password: string;
}
