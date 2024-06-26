import { axiosInstance } from '@/lib/axiosInstance';
import { AccessToken, User } from '@/lib/definitions';
import { RegisterSchema } from '@/lib/schemas';
import { z } from 'zod';

const login = async (email: string, password: string): Promise<AccessToken> => {
  const response = await axiosInstance.post('/api/auth/login', {
    email,
    password,
  });
  return response.data.accessToken;
};

const register = async (
  values: z.infer<typeof RegisterSchema>,
): Promise<string> => {
  const response = await axiosInstance.post('/api/auth/register', 
  values);
  return 'User Created';
};

const getUserProfile = async (accessToken: string): Promise<User> => {
  const response = await axiosInstance.get('/api/user/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export { login, getUserProfile, register };
