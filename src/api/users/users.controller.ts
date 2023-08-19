import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  ForbiddenException,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { IdNotFoundException } from '../../shared/exceptions/id-not-found.exception';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { ParseUUIDV4Pipe } from '../../shared/pipes/parse-uuid-v4.pipe';
import {
  ApiCreate,
  ApiFindAll,
  ApiFind,
  ApiUpdate,
  ApiDelete,
} from './decorators';
import { WhiteListPipe } from '../../shared/pipes/whitelist.pipe';

@ApiTags('Users')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(WhiteListPipe)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreate({ name: 'User', type: User, dto: CreateUserDto })
  private async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const entity: User = await this.usersService.create(createUserDto);

    return new User(entity);
  }

  @Get()
  @ApiFindAll({ name: 'User', type: User })
  private async findAll(): Promise<User[]> {
    const entities: User[] = await this.usersService.findAll();
    return entities.map((user) => new User(user));
  }

  @Get(':id')
  @ApiFind({ name: 'User', type: User })
  private async findOne(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<User> {
    const entity: User | null = await this.usersService.findOne(id);

    if (!entity) {
      throw new IdNotFoundException(id);
    }

    return new User(entity);
  }

  @Put(':id')
  @ApiUpdate({ name: 'User', dto: UpdatePasswordDto })
  private async update(
    @Param('id', ParseUUIDV4Pipe) id: string,
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const entity: User | null = await this.usersService.findOne(id);

    if (!entity) {
      throw new IdNotFoundException(id);
    }

    if (entity.password !== oldPassword) {
      throw new ForbiddenException('oldPassword is wrong');
    }

    const updated: User | null = await this.usersService.update(id, {
      password: newPassword,
    });

    if (!updated) {
      throw new IdNotFoundException(id);
    }

    return new User(updated);
  }

  @Delete(':id')
  @ApiDelete({ name: 'User' })
  @HttpCode(HttpStatus.NO_CONTENT)
  private async remove(
    @Param('id', ParseUUIDV4Pipe) id: string,
  ): Promise<void> {
    const entity: User | null = await this.usersService.findOne(id);

    if (!entity) {
      throw new IdNotFoundException(id);
    }

    await this.usersService.remove(entity);
  }
}
