// React Query hooks for authentication
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiClient, LoginRequest, SignupRequest, ForgotPasswordRequest, ResetPasswordRequest, AuthResponse } from './client';

// Query keys for React Query
export const queryKeys = {
  auth: ['auth'] as const,
  user: ['user'] as const,
};

// Custom hook for login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => apiClient.login(credentials),
    onSuccess: (response) => {
      console.log(response)
      if (response?.token) {
        apiClient.setToken(response.token);
        // Update auth state in React Query cache
        queryClient.setQueryData(queryKeys.auth, response.data);
        queryClient.setQueryData(queryKeys.user, response.data?.user);
        toast.success('Login successful!');
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook for signup
export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: SignupRequest) => apiClient.signup(userData),
    onSuccess: (response) => {
      if (response.data?.token) {
        apiClient.setToken(response.data.token);
        // Update auth state in React Query cache
        queryClient.setQueryData(queryKeys.auth, response.data);
        queryClient.setQueryData(queryKeys.user, response.data.user);
        toast.success('Login successful!');
      }
    },
    onError: (error) => {
      console.error('Signup failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Signup failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook for logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.logout(),
    onSuccess: () => {
      // Clear token and auth state
      apiClient.removeToken();
      queryClient.removeQueries({ queryKey: queryKeys.auth });
      queryClient.removeQueries({ queryKey: queryKeys.user });
      queryClient.clear(); // Clear all cached data
      toast.success('Logged out successfully!');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Even if logout fails on server, clear local auth state
      apiClient.removeToken();
      queryClient.removeQueries({ queryKey: queryKeys.auth });
      queryClient.removeQueries({ queryKey: queryKeys.user });
      queryClient.clear();
    },
  });
};

// Custom hook for forgot password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => apiClient.forgotPassword(data),
    onError: (error) => {
      console.error('Forgot password failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Forgot password failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook for reset password
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, data }: { token: string; data: ResetPasswordRequest }) =>
      apiClient.resetPassword(token, data),
    onError: (error) => {
      console.error('Reset password failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Reset password failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook to check if user is authenticated
export const useAuth = () => {
  const queryClient = useQueryClient();
  
  const authData = queryClient.getQueryData<AuthResponse>(queryKeys.auth);
  const userData = queryClient.getQueryData(queryKeys.user);
  
  return {
    isAuthenticated: apiClient.isAuthenticated(),
    user: authData?.user || userData,
    token: authData?.token || apiClient.getToken(),
  };
};

// Custom hook to get current user data
export const useUser = () => {
  const queryClient = useQueryClient();
  
  return queryClient.getQueryData(queryKeys.user);
};