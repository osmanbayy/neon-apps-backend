import { User } from '../../domain/entities/user.entity';
import { IGenericRepository } from './generic-repository.interface';

export interface IUserRepository extends IGenericRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
