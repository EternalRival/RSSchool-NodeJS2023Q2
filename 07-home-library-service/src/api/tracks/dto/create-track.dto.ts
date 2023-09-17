import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  public name: string;

  @ApiPropertyOptional({ type: 'string', format: 'uuid', nullable: true })
  @ValidateIf((_, value) => value !== null)
  @IsUUID(4)
  public albumId: string | null;

  @ApiPropertyOptional({ type: 'string', format: 'uuid', nullable: true })
  @ValidateIf((_, value) => value !== null)
  @IsUUID(4)
  public artistId: string | null;

  @ApiProperty({ description: 'In seconds' })
  @IsInt()
  public duration: number;
}
