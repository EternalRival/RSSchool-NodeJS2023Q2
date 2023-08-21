import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsInt()
  public year: number;

  @ApiPropertyOptional({ type: 'string', format: 'uuid', nullable: true })
  @ValidateIf((_, value) => value !== null)
  @IsUUID(4)
  public artistId: string | null;
}
