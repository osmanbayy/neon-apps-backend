import { createInsertSchema } from 'drizzle-zod';
import { passwordSchema } from 'src/common/validations/zod.utils';
import { users } from 'src/core/database/schema';

export const createUserSchema = createInsertSchema(users)
  .extend({
    password: passwordSchema,
  })
  .refine(
    (data) => {
      const normalizedName = data.name.toLowerCase();
      const normalizedPassword = data.password.toLowerCase();

      return !normalizedPassword.includes(normalizedName);
    },
    {
      path: ['password'],
      message: 'Password must not contain your name.',
    },
  );

export const updateUserSchema = createInsertSchema(users).partial();
