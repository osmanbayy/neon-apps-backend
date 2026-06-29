import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    'Password must contain at least one special character',
  );

export const phoneSchema = z
  .string()
  .trim()
  .regex(
    /^(\+90|0)5\d{9}$/,
    'Phone number must be in the format 05551234567 or +905551234567',
  )
  .refine(
    (phone) => {
      const normalizedPhone = phone.replace('+90', '0');

      return !/^0(\d)\1{9}$/.test(normalizedPhone);
    },
    {
      message: 'Phone number cannot consist of the same digit repeated.',
    },
  );
