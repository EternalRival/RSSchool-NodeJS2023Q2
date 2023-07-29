import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

interface UpdatePasswordDtoInterface {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export class UpdatePasswordDto implements UpdatePasswordDtoInterface {
  @ApiProperty({ description: "The user's old password" })
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: "The user's new password" })
  @IsString()
  newPassword: string;
}
