// app/ctx.tsx
import React, { createContext, useContext, PropsWithChildren, useEffect } from 'react';
import { useStorageState } from './useStorageState';
import { setAccessToken } from './apiClient'; 
type AuthContextType = {
  signIn: (sessionToken: string) => void;
  signOut: () => void;
  session: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export  const SessionProvider = ({ children }: PropsWithChildren) => {
  const [[isLoading, session], setSession] = useStorageState('session');

  useEffect(() => {
    setAccessToken(session);
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        signIn: (token: string) => {
          setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
