import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new CustomLogger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, body, query } = request;
    response.on('finish', () => {
      const { statusCode } = response;
      this.logger.log(
        `${method} ${originalUrl}. Status : ${statusCode}. Body : ${JSON.stringify(body)}. Query : ${JSON.stringify(
          query
        )} `
      );
    });

    response.on('error', (err) => {
      this.logger.error(`${method} ${originalUrl}. Error : ${err} `);
    });

    next();
  }
}
