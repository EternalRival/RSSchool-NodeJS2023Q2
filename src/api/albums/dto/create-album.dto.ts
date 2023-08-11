import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsInt()
  public year: number;

  @ApiPropertyOptional({ type: 'string', format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID(4)
  public artistId: string | null;
}
