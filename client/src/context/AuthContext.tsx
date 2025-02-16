import React, { createContext, useReducer, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import apiClient from '@/src/apiClient';

type AuthState = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
};

type AuthAction =
  | { type: 'RESTORE_TOKEN'; token: string | null }
  | { type: 'SIGN_IN'; token: string }
  | { type: 'SIGN_OUT' };

type AuthContextType = {
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (data: any) => Promise<void>;
  state: AuthState;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return { ...state, userToken: action.token, isLoading: false };
    case 'SIGN_IN':
      return { ...state, isSignout: false, userToken: action.token };
    case 'SIGN_OUT':
      return { ...state, isSignout: true, userToken: null };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  useEffect(() => {
    const restoreToken = async () => {
      let token;
      try {
        token = await SecureStore.getItemAsync('accessToken');
      } catch (e) {
        console.error('Failed to restore token', e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: token ?? null });
    };
    restoreToken();
  }, []);

  const signIn = async (username: string, password: string) => {
    const { data } = await apiClient.post('/auth/login', { username, password });
    await SecureStore.setItemAsync('accessToken', data.accessToken);
    dispatch({ type: 'SIGN_IN', token: data.accessToken });
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    dispatch({ type: 'SIGN_OUT' });
  };

  const signUp = async (data: any) => {
    const response = await apiClient.post('/auth/signup', data);
    const { accessToken } = response.data;
    await SecureStore.setItemAsync('accessToken', accessToken);
    dispatch({ type: 'SIGN_IN', token: accessToken });
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, signUp, state }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
