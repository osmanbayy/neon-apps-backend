import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class AuthenticationError extends BaseException {
  constructor(message: string) {
    super(message, 'AuthenticationError', HttpStatus.UNAUTHORIZED);
  }
}
