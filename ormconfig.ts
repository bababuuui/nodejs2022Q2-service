import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.POSTGRES_DB);

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/entities/*{.ts,.js}'],
  synchronize: true,
  // migrations: ['dist/**/migrations/**/*{.ts,.js}'],
  // migrationsRun: true,
} as DataSourceOptions;
