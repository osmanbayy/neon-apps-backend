import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IJwtService } from '../interfaces/jwt-service.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class NestJwtService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verify(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token);
  }
}
