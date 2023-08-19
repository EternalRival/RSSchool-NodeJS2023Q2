import {
  Body,
  Controller,
  ForbiddenException,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { isJWT } from 'class-validator';
import { WhiteListPipe } from '../../shared/pipes/whitelist.pipe';

@ApiTags('Auth')
@Controller('auth')
@UsePipes(WhiteListPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  private async signUp(@Body() signUpDto: SignUpDto) {
    // POST auth/signup - send login and password to create a new user
    // Server should answer with status code 201 and corresponding message if dto is valid
    const entity = await this.authService.signUp(signUpDto);

    if (!entity) {
      throw new InternalServerErrorException('auth signUp failed');
    }

    return 'successfully signed up';
  }

  @Post('/login')
  private login(@Body() loginDto: LoginDto) {
    // POST auth/login - send login and password to get Access token and Refresh token (optionally)
    // Server should answer with status code 200 and tokens if dto is valid
    // Server should answer with status code 400 and corresponding message if dto is invalid (no login or password, or they are not a strings)
    // Server should answer with status code 403 and corresponding message if authentication failed (no user with such login, password doesn't match actual one, etc.)
    this.authService.login();
    return "login'd";
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
    if (!isJWT(refreshDto.refreshToken)) {
      throw new ForbiddenException('Refresh token is invalid');
    }

    this.authService.refresh();
    return 'refreshed';
  }
}
