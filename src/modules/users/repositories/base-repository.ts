/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject } from '@nestjs/common';

import { DATABASE } from 'src/common/constants/contants';
import { IGenericRepository } from './interfaces/generic-repository.interface';
import { and, eq, isNull } from 'drizzle-orm';

export abstract class BaseRepository<T> implements IGenericRepository<T> {
  constructor(
    @Inject(DATABASE)
    protected readonly db: any,

    protected readonly table: any,
  ) {}

  abstract create(data: Partial<T>): Promise<T>;

  abstract update(id: string | number, data: Partial<T>): Promise<T>;

  async findById(id: string | number): Promise<T | null> {
    const result = await this.db
      .select()
      .from(this.table)
      .where(and(eq(this.table.id, id), isNull(this.table.deletedAt)))
      .limit(1);

    return result[0] ?? null;
  }

  async findAll(skip = 0, limit = 10): Promise<T[]> {
    return await this.db
      .select()
      .from(this.table)
      .where(isNull(this.table.deletedAt))
      .limit(limit)
      .offset(skip);
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
