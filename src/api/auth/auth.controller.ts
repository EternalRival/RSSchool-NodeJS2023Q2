import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  private signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp();
    // POST auth/signup - send login and password to create a new user
    // Server should answer with status code 201 and corresponding message if dto is valid
  }

  @Post('/login')
  private login(@Body() loginDto: LoginDto) {
    return this.authService.login();
    // POST auth/login - send login and password to get Access token and Refresh token (optionally)
    // Server should answer with status code 200 and tokens if dto is valid
    // Server should answer with status code 400 and corresponding message if dto is invalid (no login or password, or they are not a strings)
    // Server should answer with status code 403 and corresponding message if authentication failed (no user with such login, password doesn't match actual one, etc.)
  }

  @Post('/refresh')
  private refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh();

    // POST auth/refresh - send refresh token in body as { refreshToken } to get new pair of Access token and Refresh token
    // Server should answer with status code 200 and tokens in body if dto is valid
    // Server should answer with status code 401 and corresponding message if dto is invalid (no refreshToken in body)
    // Server should answer with status code 403 and corresponding message if authentication failed (Refresh token is invalid or expired)
  }
}
