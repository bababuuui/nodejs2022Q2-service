import { ConsoleLogger, Injectable, Logger, LoggerService, Scope } from '@nestjs/common';
import * as fs from 'fs';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { LogLevel } from 'ts-loader/dist/logger';
import { LogLevels } from './LogLevels';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
  constructor(context?: string, options?: ConsoleLoggerOptions) {
    super(context, options);
    //setting log levels
    if (!options || !options.logLevels) {
      const levels = [];
      const LEVEL = process.env.LOG_LEVEL || 0;
      Object.keys(LogLevels).forEach((key) => {
        if (parseInt(LogLevels[key]) <= LEVEL) {
          levels.push(key.toLowerCase());
        }
      });
      this.setLogLevels(levels);
    }
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(message, ...optionalParams);
  }
  debug(message: any, ...optionalParams: any[]) {
    super.debug(message, ...optionalParams);
  }
}
