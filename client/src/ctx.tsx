// app/ctx.tsx
import React, { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { setAccessToken, setSignOutFunction } from './apiClient';
import { useStorageState } from './useStorageState';
type AuthContextType = {
  signIn: (sessionToken: string, username: string) => void;
  signOut: () => void;
  session: string | null;
  isLoading: boolean;
  username: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [[isUsernameLoading, username], setUsername] = useStorageState('username');

  const handleSignOut = () => {
    setSession(null);
    setUsername(null);
  };

  useEffect(() => {
    setAccessToken(session);
    setSignOutFunction(handleSignOut);
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        signIn: (token: string, username: string) => {
          setSession(token);
          setUsername(username);
          console.log('Stored:', username);
        },
        signOut: handleSignOut,
        session,
        username,
        isLoading: isLoading || isUsernameLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
