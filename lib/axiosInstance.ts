import axios from "axios";
import { AccessToken, User } from "./definitions";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  // baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance };

