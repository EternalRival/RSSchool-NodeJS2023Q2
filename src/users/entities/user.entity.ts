import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

interface UserInterface {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

@Entity('users')
export class User implements UserInterface {
  @ApiProperty({ format: 'uuid' })
  @PrimaryColumn()
  public id: string;

  @ApiProperty({ example: 'TestUser' })
  @Column()
  public login: string;

  @Exclude()
  @Column()
  public password: string;

  @ApiPropertyOptional({ example: 1 })
  @Column()
  public version: number;

  @ApiPropertyOptional({ example: 1655000000 })
  @Column()
  public createdAt: number;

  @ApiPropertyOptional({ example: 1655000000 })
  @Column()
  public updatedAt: number;

  constructor(props: User) {
    Object.assign(this, props);
  }
}
