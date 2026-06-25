import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { UserRepository } from './repositories/user-repository';

@Module({
  imports: [DatabaseModule],

  controllers: [UsersController],

  providers: [UsersService, UserRepository],

  exports: [UserRepository],
})
export class UsersModule {}
