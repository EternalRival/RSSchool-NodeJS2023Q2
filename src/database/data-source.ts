import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { toNumber } from '../shared/helpers/to-number';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  username: process.env.PGUSER ?? 'hls-user',
  password: process.env.PGPASSWORD ?? 'hls-password',
  host: process.env.PGHOST ?? 'localhost',
  port: toNumber(process.env.PGPORT) ?? 5432,
  database: process.env.PGDATABASE ?? 'hls-db',
  synchronize: false,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*.ts`],
});
