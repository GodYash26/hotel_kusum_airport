
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  const DB_URL = configService.get<string>('DATABASE_URL');


  return {
    type: 'mongodb',
    url: DB_URL,
    synchronize: !isProduction,
    logging: !isProduction,
    autoLoadEntities: true,

  }

}