import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class ValidationError extends BaseException {
  constructor(message: string) {
    super(message, 'ValidationError', HttpStatus.BAD_REQUEST);
  }
}
