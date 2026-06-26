import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class AuthorizationError extends BaseException {
  constructor(message: string) {
    super(message, 'AuthorizationError', HttpStatus.FORBIDDEN);
  }
}
