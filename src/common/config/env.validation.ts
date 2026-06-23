import { envSchema } from './env.schema';

export function validateEnv(config: Record<string, unknown>) {
  return envSchema.parse(config);
}
