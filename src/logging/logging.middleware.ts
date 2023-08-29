import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('RequestLogger');

  public async use(req: Request, res: Response, next: NextFunction) {
    const { method, baseUrl, query, body } = req;

    const payload = JSON.stringify({ query, body });

    const logMessage = [method, baseUrl, payload].join(' ');
    this.logger.log(logMessage);

    next();
  }
}
