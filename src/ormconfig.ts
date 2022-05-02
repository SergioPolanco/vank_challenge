import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrationsRun: true,
  logging: process.env.NODE_ENV !== 'development',
  namingStrategy: new SnakeNamingStrategy(),
  migrations: [__dirname + '/common/database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/common/database/migrations',
  },
};

export default config;
