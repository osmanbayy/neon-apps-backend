/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { and, eq, isNull } from 'drizzle-orm';

import { AnyPgTable } from 'drizzle-orm/pg-core';

import { IGenericRepository } from './interfaces/generic-repository';

export abstract class BaseRepository<T> implements IGenericRepository<T> {
  constructor(
    protected readonly db: any,
    protected readonly table: AnyPgTable,
  ) {}

  abstract create(data: Partial<T>): Promise<T>;

  abstract update(id: string | number, data: Partial<T>): Promise<T>;

  async findAll(skip = 0, limit = 10): Promise<T[]> {
    return await this.db
      .select()
      .from(this.table)
      .where(isNull(this.table.deletedAt))
      .limit(limit)
      .offset(skip);
  }

  async findById(id: string | number): Promise<T | null> {
    const result = await this.db
      .select()
      .from(this.table)
      .where(and(eq(this.table.id, id), isNull(this.table.deletedAt)))
      .limit(1);

    return result[0] ?? null;
  }

  async softDelete(id: string | number): Promise<void> {
    await this.db
      .update(this.table)
      .set({
        deletedAt: new Date(),
      })
      .where(eq(this.table.id, id));
  }

  async restore(id: string | number): Promise<void> {
    await this.db
      .update(this.table)
      .set({
        deletedAt: null,
      })
      .where(eq(this.table.id, id));
  }
}
