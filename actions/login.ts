import { axiosInstance } from "@/lib/axiosInstance";
import { AccessToken, User } from "@/lib/definitions";

const login = async (email: string, password: string): Promise<AccessToken> => {
  const response = await axiosInstance.post("/api/auth/login", {
    email,
    password,
  });
  return response.data.accessToken;
};

const getUserProfile = async (accessToken: string): Promise<User> => {
  const response = await axiosInstance.get("/api/user/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export { login, getUserProfile };