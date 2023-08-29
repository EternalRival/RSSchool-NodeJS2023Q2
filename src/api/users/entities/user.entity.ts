import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

interface UserInterface {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

@Entity()
export class User implements UserInterface {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ example: 'TestUser' })
  @Column({ unique: true })
  public login: string;

  @Column()
  @Exclude()
  public password: string;

  @ApiPropertyOptional({ example: 1 })
  @VersionColumn()
  public version: number;

  @ApiPropertyOptional({ example: 1655000000 })
  @CreateDateColumn()
  @Type(() => Number)
  public createdAt: number;

  @ApiPropertyOptional({ example: 1655000000 })
  @UpdateDateColumn()
  @Type(() => Number)
  public updatedAt: number;

  constructor(props: User) {
    Object.assign(this, props);
  }
}
