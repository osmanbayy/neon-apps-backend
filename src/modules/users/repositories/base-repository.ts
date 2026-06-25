import { DATABASE } from 'src/common/constants/contants';
import { IGenericRepository } from './interfaces/generic-repository.interface';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type { AnyPgTable } from 'drizzle-orm/pg-core';
import { Inject } from '@nestjs/common';

export abstract class BaseRepository<T> implements IGenericRepository<T> {
  constructor(
    @Inject(DATABASE)
    protected readonly db: PostgresJsDatabase,

    protected readonly table: AnyPgTable,
  ) {}

  abstract create(entity: T): Promise<T>;

  abstract update(id: string | number, entity: T): Promise<T>;

  abstract findById(id: string | number): Promise<T | null>;

  abstract findAll(skip?: number, limit?: number): Promise<T[]>;

  abstract softDelete(id: string | number): Promise<void>;

  abstract restore(id: string | number): Promise<void>;
}
