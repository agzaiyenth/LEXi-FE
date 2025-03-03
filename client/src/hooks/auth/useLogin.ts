import { useState } from 'react';
import apiClient, { setAccessToken } from '@/src/apiClient';
import { useSession } from '@/src/ctx';
import { LoginRequest, LoginResponse } from '@/src/types/auth/LoginResponse ';
import { useUsername } from '@/src/useStorageState';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useSession();

  const [, setStoredUsername] = useUsername();

  const login = async ({ username, password }: LoginRequest): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', { username, password });

      const { accessToken, refreshToken, username: user, fullName, roles } = response.data;

      // Store tokens securely in context
      signIn(accessToken, user);
      console.log('Sign-in called with:', user);

      // Set token in apiClient
      setAccessToken(accessToken);
      setStoredUsername(user);


      // Return the parsed response
      return { accessToken, refreshToken, username: user, fullName, roles };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred during login.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
