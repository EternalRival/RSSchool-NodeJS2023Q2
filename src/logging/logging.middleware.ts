import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { finished } from 'stream/promises';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('RequestLogger');

  public async use(req: Request, res: Response, next: NextFunction) {
    const { method, baseUrl, query, body } = req;

    next();

    await finished(res);

    const logMessage = [
      res.statusCode,
      method,
      baseUrl,
      JSON.stringify({ query, body }),
    ].join(' ');
    this.logger.log(logMessage);
  }
}
