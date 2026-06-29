import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ExceptionResponse } from '../interfaces/exception-response.interface';
import { ErrorResponse } from '../interfaces/error-response.interface';
import { ZodValidationException } from 'nestjs-zod';
import { ZodValidationResponse } from '../interfaces/zod-validation-response.interface';

@Injectable()
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly configService: ConfigService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const isProduction = this.configService.getOrThrow<boolean>('isProduction');

    if (exception instanceof ZodValidationException) {
      const exceptionResponse =
        exception.getResponse() as ZodValidationResponse;

      const errors = exceptionResponse.errors.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      const body: ErrorResponse = {
        type: 'Client Error',
        error: 'ValidationError',
        message: 'Validation failed',
        errors,
        timestamp: new Date().toISOString(),
        path: request.url,
        statusCode: 400,
      };

      if (!isProduction && exception instanceof Error) {
        body.stack = exception.stack;
      }

      this.logger.error(JSON.stringify(body));

      response.status(400).send(body);
      return;
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const errorResponse: ExceptionResponse =
        typeof exceptionResponse === 'string'
          ? {
              error: 'HttpException',
              message: exceptionResponse,
            }
          : (exceptionResponse as ExceptionResponse);

      const body: ErrorResponse = {
        type: statusCode >= 500 ? 'Server Error' : 'Client Error',
        error: errorResponse.error,
        message: errorResponse.message,
        timestamp: new Date().toISOString(),
        path: request.url,
        statusCode,
      };

      if (!isProduction && exception instanceof Error) {
        body.stack = exception.stack;
      }

      this.logger.error(JSON.stringify(body));

      response.status(statusCode).send(body);
      return;
    }

    const body: ErrorResponse = {
      type: 'Server Error',
      error: 'InternalServerError',
      message: 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: 500,
    };

    if (!isProduction && exception instanceof Error) {
      body.stack = exception.stack;
    }

    this.logger.error(
      exception instanceof Error ? exception.stack : String(exception),
    );

    response.status(500).send(body);
  }
}
