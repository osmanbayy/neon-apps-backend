import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class BusinessRuleError extends BaseException {
  constructor(message: string) {
    super(message, 'BusinessRuleError', HttpStatus.BAD_REQUEST);
  }
}
