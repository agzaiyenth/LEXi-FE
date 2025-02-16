import { useState } from 'react';
import apiClient, { setAccessToken } from '@/src/apiClient';
import { useSession } from '@/src/ctx';
import { LoginRequest, LoginResponse } from '@/src/types/auth/LoginResponse ';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useSession();

  const login = async ({ username, password }: LoginRequest): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', { username, password });

      const { accessToken, refreshToken, username: user, fullName, roles } = response.data;

      // Store tokens securely in context
      signIn(accessToken);

      // Set token in apiClient
      setAccessToken(accessToken);

      // Return the parsed response
      return { accessToken, refreshToken, username: user, fullName, roles };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred during login.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
