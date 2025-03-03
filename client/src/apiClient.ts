import { BASE_URL } from '@/config';
import axios from 'axios';
import { signOutUser } from './utils/authUtils';

let accessToken: string | null = null;
let signOutFn: (() => void) | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const setSignOutFunction = (fn: () => void) => {
  signOutFn = fn;
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
    if (error.response?.status === 401 && signOutFn) {
      await signOutUser(signOutFn); // Pass the signOut function
    }
    return Promise.reject(error);
  }
);

export default apiClient;
