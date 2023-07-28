import { IsString } from 'class-validator';

interface UpdatePasswordDtoInterface {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export class UpdatePasswordDto implements UpdatePasswordDtoInterface {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
