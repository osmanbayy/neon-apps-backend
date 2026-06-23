import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/common/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { mockUsers } from 'src/common/constants/contants';

@Injectable()
export class UsersService {
  private users: User[] = mockUsers;

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    const user = this.users.find((usr) => usr.id === id);
    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(newUser);

    return newUser;
  }
}
