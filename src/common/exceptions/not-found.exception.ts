import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class NotFoundError extends BaseException {
  constructor(message: string) {
    super(message, 'NotFoundError', HttpStatus.NOT_FOUND);
  }
}
