import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  public name: string;

  @ApiPropertyOptional({ type: 'string', format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  public albumId: string | null;

  @ApiPropertyOptional({ type: 'string', format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  public artistId: string | null;

  @ApiProperty({ description: 'In seconds' })
  @IsInt()
  public duration: number;
}
