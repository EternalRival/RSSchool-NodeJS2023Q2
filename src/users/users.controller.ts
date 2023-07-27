import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    // - Server should answer with `status code` **200** and all users records
    return this.usersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    // - Server should answer with `status code` **200** and and record with `id === userId` if it exists
    // - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    // - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    return this.usersService.findOne(+id);
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // - Server should answer with `status code` **201** and newly created record if request is valid
    // - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    return this.usersService.create(createUserDto);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    // - Server should answer with` status code` **200** and updated record if request is valid
    // - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    // - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    // - Server should answer with` status code` **403** and corresponding message if `oldPassword` is wrong
    return this.usersService.update(+id, updatePasswordDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    // - Server should answer with `status code` **204** if the record is found and deleted
    // - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    // - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    return this.usersService.remove(+id);
  }
}
