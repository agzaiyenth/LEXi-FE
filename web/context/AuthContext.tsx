// AuthContext.tsx
'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axiosInstance from '../lib/axios';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean; // <-- add loading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on mount.
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Persist token changes in localStorage.
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', { username, password });
      // Correct property name: use accessToken
      const accessToken: string = response.data.accessToken;
      setToken(accessToken);
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };
  

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
