import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user-repository';
import { User } from './domain/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Email } from './domain/value-objects/email.vo';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = User.create({
      name: createUserDto.name,
      email: Email.create(createUserDto.email),
    });

    return this.userRepository.create(user);
  }
}
