import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  albumId: string;

  @IsOptional()
  @IsUUID()
  artistId: string;

  @IsInt()
  duration: number;
}
