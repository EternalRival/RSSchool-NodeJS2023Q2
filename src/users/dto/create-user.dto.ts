import { IsString } from 'class-validator';

interface CreateUserDtoInterface {
  login: string;
  password: string;
}

export class CreateUserDto implements CreateUserDtoInterface {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
