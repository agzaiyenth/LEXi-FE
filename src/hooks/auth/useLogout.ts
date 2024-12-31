// app/hooks/auth/useLogout.ts
import apiClient, { setAccessToken } from '@/src/apiClient';
import { useSession } from '@/src/ctx';

export const useLogout = () => {
  const { signOut } = useSession();

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (err: any) {
      console.log('Logout failed:', err.message);
    } finally {
      signOut();
      setAccessToken(null); // Clear the token in apiClient
    }
  };

  return { logout };
};
