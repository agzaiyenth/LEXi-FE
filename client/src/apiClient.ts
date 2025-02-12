import axios from 'axios';
import { BASE_URL } from '@/config';
import { signOutUser } from '../utils/authUtils'; 

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await signOutUser(); // Call sign out function if token expires
    }
    return Promise.reject(error);
  }
);

export default apiClient;
