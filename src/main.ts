import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import 'dotenv/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './common/utils/logging/custom-logger.service';
import { HttpExceptionFilter } from './common/utils/errorHandling/exception.filter';

const PORT = process.env.PORT || 4000;
const logger = new CustomLogger('app');
process
  .on('unhandledRejection', (reason, p) => {
    logger.error(reason, 'Unhandled Rejection at Promise', p);
    process.exit(1);
  })
  .on('uncaughtException', (err) => {
    logger.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, '..', 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useLogger(new CustomLogger());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);
  //logging (for testing and checking purposes)
  logger.debug('THIS IS DEBUG LOG');
  logger.error('THIS IS ERROR LOG, IT IS OK');
  logger.log('THIS IS INFO LOG');
}

bootstrap();
