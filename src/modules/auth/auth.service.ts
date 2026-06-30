import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JWT_SERVICE } from 'src/common/constants/contants';
import { BusinessRuleError } from 'src/common/exceptions/business-rule.exception';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/domain/entities/user.entity';
import { Email } from '../users/domain/value-objects/email.vo';
import { UserRepository } from '../users/repositories/user-repository';

import type { IJwtService } from './interfaces/jwt-service.interface';
import { AuthenticationError } from 'src/common/exceptions/authentication.exception';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,

    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const email = Email.create(dto.email);

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new BusinessRuleError('Email already exists.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = User.create({
      name: dto.name,
      email,
      phone: dto.phone,
      password: hashedPassword,
    });

    const createdUser = await this.userRepository.create(user);

    const accessToken = await this.jwtService.sign({
      sub: createdUser.getId()!,
      email: createdUser.getEmail().toString(),
    });

    return {
      accessToken,
    };
  }

  async login(dto: LoginDto) {
    const email = Email.create(dto.email);

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AuthenticationError('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.getPassword(),
    );

    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid email or password.');
    }

    const accessToken = await this.jwtService.sign({
      sub: user.getId()!,
      email: user.getEmail().toString(),
    });

    return {
      accessToken,
    };
  }
}
