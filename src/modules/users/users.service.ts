import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user-repository';
import { User } from './domain/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Email } from './domain/value-objects/email.vo';
import { NotFoundError } from 'src/common/exceptions/not-found.exception';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundError('User not found.');

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = User.create({
      name: createUserDto.name,
      email: Email.create(createUserDto.email),
    });

    return this.userRepository.create(user);
  }

  async updateUser(id: number, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundError('User not found.');

    const updatedUser = User.restore({
      id: user.getId()!,
      name: updateUserDto.name,
      email: Email.create(updateUserDto.email),
      createdAt: user.getCreatedAt()!,
      updatedAt: user.getUpdatedAt()!,
      deletedAt: user.getDeletedAt()!,
    });

    return this.userRepository.update(id, updatedUser);
  }

  async softDelete(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundError('User not found.');

    await this.userRepository.softDelete(id);
  }

  async restore(id: number): Promise<void> {
    await this.userRepository.restore(id);
  }
}
