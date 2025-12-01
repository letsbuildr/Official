// Authentication context and provider
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLogin, useSignup, useLogout } from './hooks';
import { LoginRequest, SignupRequest } from './client';
import { apiClient } from './client';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchUser } from '../redux/actions/userActions';

interface AuthContextType {
  user: {
    id: string;
    _id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    photo?: string;
    activities?: unknown[];
    progress?: number;
    __v?: number;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (userData: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const logoutMutation = useLogout();

  const { user, loading: userLoading } = useAppSelector(state => state.user);
  const isAuthenticated = apiClient.isAuthenticated();
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const hasToken = apiClient.isAuthenticated();
      setIsLoading(false);

      if (hasToken) {
        // Fetch current user data into Redux
        dispatch(fetchUser());
      } else {
        // Clear any stale auth data
        queryClient.removeQueries({ queryKey: ['auth'] });
        queryClient.removeQueries({ queryKey: ['user'] });
      }
    };

    checkAuth();
  }, [dispatch, queryClient]);

  const login = async (credentials: LoginRequest) => {
    try {
      await loginMutation.mutateAsync(credentials);
      // After successful login, fetch full user details and save to Redux
      dispatch(fetchUser());
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData: SignupRequest) => {
    try {
      await signupMutation.mutateAsync(userData);
      // After successful signup, fetch full user details and save to Redux
      dispatch(fetchUser());
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user: user as {
      id: string;
      _id: string;
      name: string;
      username: string;
      email: string;
      role: string;
      photo?: string;
      activities?: unknown[];
      progress?: number;
      __v?: number;
    } | null,
    isAuthenticated,
    isLoading: isLoading || userLoading || loginMutation.isPending || signupMutation.isPending || logoutMutation.isPending,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};