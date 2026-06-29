import { timestamp, text, serial, pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),

  name: text('name').notNull(),

  email: text('email').unique().notNull(),

  password: text('password').notNull(),

  createdAt: timestamp('created_at').defaultNow(),

  updatedAt: timestamp('updated_at').defaultNow(),

  deletedAt: timestamp('deleted_at'),
});
