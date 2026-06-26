import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationError } from './common/exceptions/validation.exception';
import { BusinessRuleError } from './common/exceptions/business-rule.exception';
import { AuthenticationError } from './common/exceptions/authentication.exception';
import { AuthorizationError } from './common/exceptions/authorization.exception';
import { NotFoundError } from './common/exceptions/not-found.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('validation-error')
  validationError() {
    throw new ValidationError('Validation failed');
  }

  @Get('business-error')
  businessError() {
    throw new BusinessRuleError('Business rule violated');
  }

  @Get('authentication-error')
  authenticationError() {
    throw new AuthenticationError('Authentication failed');
  }

  @Get('authorization-error')
  authorizationError() {
    throw new AuthorizationError('Access denied');
  }

  @Get('not-found')
  notFound() {
    throw new NotFoundError('User not found');
  }

  @Get('internal-server-error')
  internalServerError() {
    throw new Error('Unexpected server error');
  }
}
