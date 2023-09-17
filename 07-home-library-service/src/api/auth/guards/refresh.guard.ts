import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { isJWT } from 'class-validator';
import { Request } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class RefreshGuard implements CanActivate {
  private secret: string;

  constructor(
    private jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.secret = configService.get('JWT_SECRET_REFRESH_KEY', 'secret123123');
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = this.getToken(request);

    if (!token) {
      const message = 'authentication failed (no refresh token in body)';
      throw new UnauthorizedException(message);
    }

    request.body.refreshTokenPayload = await this.verifyToken(token);

    return true;
  }

  public async verifyToken(token: string): Promise<unknown> {
    try {
      const verifyOptions = { secret: this.secret };
      return await this.jwtService.verifyAsync(token, verifyOptions);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        const message = 'authentication failed (token is expired)';
        throw new ForbiddenException(message);
      }
      if (
        error instanceof JsonWebTokenError &&
        error.message === 'invalid signature'
      ) {
        const message = 'authentication failed (token is invalid)';
        throw new ForbiddenException(message);
      }
      throw error;
    }
  }

  private getToken(request: Request): string | null {
    const { refreshToken } = request.body;
    return isJWT(refreshToken) ? refreshToken : null;
  }
}
