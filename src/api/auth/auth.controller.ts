import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { isJWT } from 'class-validator';
import { WhiteListPipe } from '../../shared/pipes/whitelist.pipe';
import { User } from '../users/entities/user.entity';
import { isDatabaseError } from '../../shared/helpers/is-database-error';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(WhiteListPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  private async signUp(@Body() signUpDto: SignUpDto) {
    try {
      const entity = await this.authService.signUp(signUpDto);
      return new User(entity);
    } catch (error) {
      throw isDatabaseError(error) && error.detail?.includes('already exists')
        ? new BadRequestException('This login is not unique')
        : error;
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  private async login(@Body() loginDto: LoginDto) {
    const { login, password } = loginDto;

    const entity = await this.authService.getUserByLogin(login);

    if (!entity) {
      throw new ForbiddenException('no user with such login');
    }

    const isAllowed = await this.authService.verifyPassword(entity, password);

    if (!isAllowed) {
      throw new ForbiddenException("password doesn't match actual one");
    }

    return this.authService.login(entity);
  }

  @Post('/refresh')
  private refresh(
    @Body(new WhiteListPipe({ errorHttpStatusCode: HttpStatus.UNAUTHORIZED }))
    refreshDto: RefreshDto,
  ) {
    // POST auth/refresh - send refresh token in body as { refreshToken } to get new pair of Access token and Refresh token
    // Server should answer with status code 200 and tokens in body if dto is valid
    // Server should answer with status code 401 and corresponding message if dto is invalid (no refreshToken in body)
    // Server should answer with status code 403 and corresponding message if authentication failed (Refresh token is invalid or expired)
    if (!isJWT(+refreshDto.refreshToken)) {
      throw new ForbiddenException('Refresh token is invalid');
    }

    this.authService.refresh();
    return 'refreshed';
  }
}
