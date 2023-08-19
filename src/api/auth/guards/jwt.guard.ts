import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate {
  public publicRoutes = ['/auth/signup', '/auth/login', '/doc', '/'];

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
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

    return true;
  }

  private getToken(request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : null;
  }
}
