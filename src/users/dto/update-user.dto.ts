interface UpdatePasswordDtoInterface {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export class UpdatePasswordDto implements UpdatePasswordDtoInterface {
  oldPassword: string;
  newPassword: string;
}
