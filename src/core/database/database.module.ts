import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { Env } from 'src/common/config/env.schema';
import { DATABASE } from 'src/common/constants/contants';

@Module({
  providers: [
    {
      provide: DATABASE,

      useFactory: (configService: ConfigService<Env>) => {
        const databaseUrl =
          configService.getOrThrow<Env['DATABASE_URL']>('DATABASE_URL');

        const client = postgres(databaseUrl);

        return drizzle(client);
      },

      inject: [ConfigService],
    },
  ],

  exports: [DATABASE],
})
export class DatabaseModule {}
