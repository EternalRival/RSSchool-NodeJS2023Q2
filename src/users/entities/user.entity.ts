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
  public id: string;

  @ApiProperty({ example: 'TestUser' })
  public login: string;

  @Exclude()
  public password: string;

  @ApiPropertyOptional({ example: 1 })
  public version: number;

  @ApiPropertyOptional({ example: 1655000000 })
  public createdAt: number;

  @ApiPropertyOptional({ example: 1655000000 })
  public updatedAt: number;

  constructor(props: User) {
    Object.assign(this, props);
  }
}
