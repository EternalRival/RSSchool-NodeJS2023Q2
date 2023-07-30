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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { IdNotFoundError } from '../shared/id-not-found.error';
import { User } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Creates a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'The user has been created', type: User })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  create(@Body() createUserDto: CreateUserDto) {
    const entity = this.usersService.create(createUserDto);

    return new User(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Gets all users' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: User,
    isArray: true,
  })
  findAll(): User[] {
    return this.usersService.findAll().map((user) => new User(user));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Successful operation', type: User })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.usersService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    return new User(entity);
  }

  @Put(':id')
  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiOkResponse({
    description: 'The user has been updated',
    schema: {
      title: 'User',
      properties: {
        id: { type: 'string', format: 'uuid' },
        login: { type: 'string', example: 'TestUser' },
        version: { type: 'integer', example: 2 },
        createdAt: { type: 'integer', example: 1655000000 },
        updatedAt: { type: 'integer', example: 1655999999 },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiForbiddenResponse({ description: 'oldPassword is wrong' })
  @ApiNotFoundResponse({ description: 'User not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const entity = this.usersService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    if (entity.password !== oldPassword) {
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
    }

    const updated = this.usersService.update(id, { password: newPassword });

    return new User(updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user', description: 'Deletes user by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'The user has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.usersService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    const deleted = this.usersService.remove(entity);

    return new User(deleted);
  }
}
