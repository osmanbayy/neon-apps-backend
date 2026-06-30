import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { IGenericRepository } from './generic-repository.interface';

export interface IUserRepository extends IGenericRepository<User> {
  findByEmail(email: Email): Promise<User | null>;
}
