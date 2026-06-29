import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from './base-repository';
import { User } from '../domain/entities/user.entity';
import { DATABASE } from 'src/common/constants/contants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { users } from 'src/core/database/schema';
import { Email } from '../domain/value-objects/email.vo';
import { and, eq, isNull } from 'drizzle-orm';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @Inject(DATABASE)
    db: PostgresJsDatabase,
  ) {
    super(db, users);
  }

  async create(entity: User): Promise<User> {
    const result = await this.db
      .insert(users)
      .values({
        name: entity.getName(),
        email: entity.getEmail().toString(),
        password: entity.getPassword(),
      })
      .returning();

    const row = result[0];

    return User.restore({
      id: row.id,
      name: row.name,
      email: Email.create(row.email),
      password: row.password,
      createdAt: row.createdAt!,
      updatedAt: row.updatedAt!,
      deletedAt: row.deletedAt,
    });
  }

  async update(id: string | number, entity: User): Promise<User> {
    const [row] = await this.db
      .update(users)
      .set({
        name: entity.getName(),
        email: entity.getEmail().toString(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, Number(id)))
      .returning();

    return User.restore({
      id: row.id,
      name: row.name,
      email: Email.create(row.email),
      password: row.password,
      createdAt: row.createdAt!,
      updatedAt: row.updatedAt!,
      deletedAt: row.deletedAt,
    });
  }

  async findById(id: string | number): Promise<User | null> {
    const [row] = await this.db
      .select()
      .from(users)
      .where(and(eq(users.id, Number(id)), isNull(users.deletedAt)));

    if (!row) return null;

    return User.restore({
      id: row.id,
      name: row.name,
      email: Email.create(row.email),
      password: row.password,
      createdAt: row.createdAt!,
      updatedAt: row.updatedAt!,
      deletedAt: row.deletedAt,
    });
  }

  async findAll(skip = 0, limit = 10): Promise<User[]> {
    const rows = await this.db
      .select()
      .from(users)
      .where(isNull(users.deletedAt))
      .limit(limit)
      .offset(skip);

    return rows.map((row) =>
      User.restore({
        id: row.id,
        name: row.name,
        email: Email.create(row.email),
        password: row.password,
        createdAt: row.createdAt!,
        updatedAt: row.updatedAt!,
        deletedAt: row.deletedAt,
      }),
    );
  }

  async softDelete(id: string | number): Promise<void> {
    await this.db
      .update(users)
      .set({
        deletedAt: new Date(),
      })
      .where(eq(users.id, Number(id)));
  }

  async restore(id: string | number): Promise<void> {
    await this.db
      .update(users)
      .set({
        deletedAt: null,
      })
      .where(eq(users.id, Number(id)));
  }

  async findByEmail(email: Email): Promise<User | null> {
    const [row] = await this.db
      .select()
      .from(users)
      .where(and(eq(users.email, email.toString()), isNull(users.deletedAt)));

    if (!row) {
      return null;
    }

    return User.restore({
      id: row.id,
      name: row.name,
      email: Email.create(row.email),
      password: row.password,
      createdAt: row.createdAt!,
      updatedAt: row.updatedAt!,
      deletedAt: row.deletedAt,
    });
  }
}
