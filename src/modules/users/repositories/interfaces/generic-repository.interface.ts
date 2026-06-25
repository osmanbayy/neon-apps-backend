export interface IGenericRepository<T> {
  // create(data: Partial<T> yerine entity T; çünkü repository entity ile çalışmalı)
  create(entity: T): Promise<T>;

  update(id: string | number, entity: T): Promise<T>;

  findById(id: string | number): Promise<T | null>;

  findAll(skip?: number, limit?: number): Promise<T[]>;

  softDelete(id: string | number): Promise<void>;

  restore(id: string | number): Promise<void>;
}
