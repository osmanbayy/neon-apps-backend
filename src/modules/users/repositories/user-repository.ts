/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';
import { BaseRepository } from './base-repository';
import { DATABASE } from 'src/common/constants/contants';
import { users } from 'src/core/database/schema';
import { eq } from 'drizzle-orm';

export class UserRepository extends BaseRepository<User> {
  constructor(
    @Inject(DATABASE)
    db: any,
  ) {
    super(db, users);
  }

  async create(data: Partial<User>): Promise<User> {
    const result = await this.db.insert(users).values(data).returning();

    return result[0];
  }

  async update(id: string | number, data: Partial<User>): Promise<User> {
    const result = await this.db
      .update(users)
      .set(data)
      .where(eq(users.id, Number(id)))
      .returning();

    return result[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0] ?? null;
  }
}
