import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: process.env.NEXTLENSE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export { axiosInstance };
