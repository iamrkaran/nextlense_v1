import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: process.env.NEXTLENSE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosInstance };
