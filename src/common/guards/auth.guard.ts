/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestWithUser } from '../interfaces/request-with-user.interface';
import { mockUsers } from '../constants/contants';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = mockUsers.find((user) => user.id === 1);

    if (!user) return false;

    const { password, ...authUser } = user;
    request.user = authUser;

    return true;
  }
}
