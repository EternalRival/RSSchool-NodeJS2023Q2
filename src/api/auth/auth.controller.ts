import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { WhiteListPipe } from '../../shared/pipes/whitelist.pipe';
import { User } from '../users/entities/user.entity';
import { isDatabaseError } from '../../shared/helpers/is-database-error';
import { RefreshGuard } from './guards/refresh.guard';
import { JwtTokensResponse } from './interfaces/jwt-tokens-response.interface';
import { UsersService } from '../users/users.service';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  @UsePipes(WhiteListPipe)
  private async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    try {
      const entity = await this.usersService.create(signUpDto);
      return new User(entity);
    } catch (error) {
      throw isDatabaseError(error) && error.detail?.includes('already exists')
        ? new BadRequestException('This login is not unique')
        : error;
    }
  }

  @Post('/login')
  @UsePipes(WhiteListPipe)
  @HttpCode(HttpStatus.OK)
  private async login(@Body() loginDto: LoginDto): Promise<JwtTokensResponse> {
    const { login, password } = loginDto;

    const entity = await this.usersService.findOne({ login });

    if (!entity) {
      throw new ForbiddenException('no user with such login');
    }

    const isAllowed = await this.usersService.verifyPassword(entity, password);

    if (!isAllowed) {
      throw new ForbiddenException("password doesn't match actual one");
    }

    const payload = { userId: entity.id, login: entity.login };

    return this.authService.generateTokenPair(payload);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  private refresh(@Body() refreshDto: RefreshDto): Promise<JwtTokensResponse> {
    const { userId, login } = refreshDto.refreshTokenPayload;
    return this.authService.generateTokenPair({ userId, login });
  }
}
