import { HttpException } from '@nestjs/common';
import { ExceptionResponse } from '../interfaces/exception-response.interface';

export class BaseException extends HttpException {
  protected constructor(message: string, error: string, statusCode: number) {
    const response: ExceptionResponse = {
      error,
      message,
    };
    super(response, statusCode);
  }
}
