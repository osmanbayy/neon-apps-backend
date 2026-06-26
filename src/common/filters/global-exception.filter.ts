import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionResponse } from '../interfaces/exception-response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const errorResponse =
        typeof exceptionResponse === 'string'
          ? {
              error: 'HttpsException',
              message: exceptionResponse,
            }
          : (exceptionResponse as ExceptionResponse);

      const body = {
        type: statusCode >= 500 ? 'Server Error' : 'Client Error',
        error: errorResponse.error,
        message: errorResponse.message,
        timestamp: new Date().toISOString(),
        path: request.url,
        statusCode,
      };

      response.status(statusCode).json(body);

      return;
    }

    response.status(500).json({
      type: 'Server Error',
      error: 'InternalServerError',
      message: 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: 500,
    });
  }
}
