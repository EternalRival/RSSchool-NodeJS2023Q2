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
  private async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const entity: User = await this.usersService.create(createUserDto);

    return new User(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Gets all users' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: User,
    isArray: true,
  })
  private async findAll(): Promise<User[]> {
    const entities: User[] = await this.usersService.findAll();
    return entities.map((user) => new User(user));
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
  private async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    const entity: User | null = await this.usersService.findOne(id);

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
  private async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const entity: User | null = await this.usersService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    if (entity.password !== oldPassword) {
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
    }

    const updated: User | null = await this.usersService.update(id, {
      password: newPassword,
    });

    if (!updated) {
      throw new IdNotFoundError(id);
    }

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
  private async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const entity: User = await this.usersService.findOne(id);

    if (!entity) {
      throw new IdNotFoundError(id);
    }

    this.usersService.remove(entity);
  }
}
