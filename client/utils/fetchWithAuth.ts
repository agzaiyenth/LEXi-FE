import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from '@/config';

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const accessToken = await SecureStore.getItemAsync('accessToken');

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
      // Token expired, refresh it
    const refreshToken = await SecureStore.getItemAsync('refreshToken');

    const tokenResponse = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (tokenResponse.ok) {
      const { accessToken: newAccessToken } = await tokenResponse.json();
      await SecureStore.setItemAsync('accessToken', newAccessToken);

      // Retry the original request
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
    } else {
      throw new Error('Session expired. Please log in again.');
    }
  }

  return response;
};
