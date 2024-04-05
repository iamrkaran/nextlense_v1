import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/lib/definitions';
import { authConfig } from './auth.config';
import { getUserProfile, login } from './actions/login';

async function loginUser(email: string, password: string): Promise<User> {
  try {
    const accessToken = await login(email, password);
    const user = await getUserProfile(accessToken);
    user.accessToken = accessToken;
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { handlers: { GET, POST }, auth, signIn, signOut ,} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await loginUser(email, password);

          if (!user) return null;

          return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
 
});
