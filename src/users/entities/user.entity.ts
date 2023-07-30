import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

interface UserInterface {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class User implements UserInterface {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'TestUser' })
  login: string;

  @Exclude()
  password: string;

  @ApiPropertyOptional({ example: 1 })
  version: number;

  @ApiPropertyOptional({ example: 1655000000 })
  createdAt: number;

  @ApiPropertyOptional({ example: 1655000000 })
  updatedAt: number;

  constructor(props: User) {
    Object.assign(this, props);
  }
}
