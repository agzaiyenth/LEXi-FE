import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from '@/config';
import { signOutUser } from './authUtils';

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const accessToken = await SecureStore.getItemAsync('accessToken');

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    // Try to refresh token
    const refreshToken = await SecureStore.getItemAsync('refreshToken');

    if (!refreshToken) {
      await signOutUser();
      return response;
    }

    const tokenResponse = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (tokenResponse.ok) {
      const { accessToken: newAccessToken } = await tokenResponse.json();
      await SecureStore.setItemAsync('accessToken', newAccessToken);

      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      return response;
    } else {
      await signOutUser(); // Clear tokens
      return response;
    }
  }

  return response;
};
