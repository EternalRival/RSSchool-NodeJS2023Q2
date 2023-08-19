import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AccessGuard implements CanActivate {
  public publicRoutes = ['/auth/signup', '/auth/login', '/doc', '/'];
  private secret: string;

  constructor(
    private jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.secret = configService.get('JWT_SECRET_KEY', 'secret123123');
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (this.publicRoutes.includes(request.route.path)) {
      return true;
    }
    const token = this.getToken(request);

    if (!token) {
      const message =
        'authentication failed (refresh token is invalid or expired)';
      throw new UnauthorizedException(message);
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: this.secret,
      });
    } catch {
      const message =
        'authentication failed (refresh token is invalid or expired)';
      throw new UnauthorizedException(message);
    }

    return true;
  }

  private getToken(request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : null;
  }
}
