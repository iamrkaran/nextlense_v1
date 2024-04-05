'use server';
import { axiosInstance } from '@/lib/axiosInstance';
import { AccessToken, User } from './definitions';

export const fetchUser = async (userId: string, accessToken: AccessToken): Promise<User> => {
  if (!accessToken) {
    throw new Error('Access token is required to fetch user data.');
  }
  const res = await axiosInstance.get<User>(`/api/user?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
