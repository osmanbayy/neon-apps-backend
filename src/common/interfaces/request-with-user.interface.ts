import { FastifyRequest } from 'fastify';
import { JwtPayload } from 'src/modules/auth/interfaces/jwt-payload.interface';

export interface RequestWithUser extends FastifyRequest {
  user: JwtPayload;
}
