'use server';
import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const FormData = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
