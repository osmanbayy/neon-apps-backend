import { Request } from 'express';
import { AuthUser } from './user.interface';

export interface RequestWithUser extends Request {
  user: AuthUser;
}
