import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { IdNotFoundError } from '../shared/id-not-found.error';
import { User } from './entities/user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    const entity = this.usersService.create(createUserDto);
    return new User(entity);
  }

  @Get()
  findAll() {
    return this.usersService.findAll().map((user) => new User(user));
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.usersService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    return new User(entity);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const entity = this.usersService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    if (entity.password !== oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }

    const updated = this.usersService.update(id, { password: newPassword });

    return new User(updated);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.usersService.remove(id);
    if (!entity) {
      throw new IdNotFoundError(id);
    }

    return new User(entity);
  }
}
