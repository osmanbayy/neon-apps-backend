import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number(),
  HOST: z.string().min(1),
  JWT_SECRET: z.string().min(10),
  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),
  SWAGGER_USER: z.string().min(1),
  SWAGGER_PASSWORD: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
