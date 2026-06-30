import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWT_SERVICE } from 'src/common/constants/contants';
import { NestJwtService } from './adapters/nest-jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Env } from 'src/common/config/env.schema';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env>) => ({
        secret: configService.getOrThrow<Env['JWT_SECRET']>('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: JWT_SERVICE,
      useClass: NestJwtService,
    },
  ],
})
export class AuthModule {}
