import { createInsertSchema } from 'drizzle-zod';
import { passwordSchema } from 'src/common/validations/zod.utils';
import { users } from 'src/core/database/schema';

export const createUserSchema = createInsertSchema(users).extend({
  password: passwordSchema,
});
