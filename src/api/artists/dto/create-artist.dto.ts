import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsBoolean()
  public grammy: boolean;
}
