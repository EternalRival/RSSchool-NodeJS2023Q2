interface CreateUserDtoInterface {
  login: string;
  password: string;
}

export class CreateUserDto implements CreateUserDtoInterface {
  login: string;
  password: string;
}
