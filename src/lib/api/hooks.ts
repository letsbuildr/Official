// React Query hooks for authentication
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiClient, LoginRequest, SignupRequest, ForgotPasswordRequest, ResetPasswordRequest, AuthResponse, Service } from './client';

// Query keys for React Query
export const queryKeys = {
  auth: ['auth'] as const,
  user: ['user'] as const,
  users: ['users'] as const,
  services: ['services'] as const,
  adminOverview: ['adminOverview'] as const,
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

// Custom hook to get all users
export const useAllUsers = () => {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: () => apiClient.getAllUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook to delete a user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => apiClient.deleteUser(userId),
    onSuccess: () => {
      // Invalidate and refetch users
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      toast.success('User deleted successfully!');
    },
    onError: (error) => {
      console.error('Delete user failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Delete user failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook to get all services
export const useAllServices = () => {
  return useQuery({
    queryKey: queryKeys.services,
    queryFn: () => apiClient.getAllServices(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook to get a service by slug
export const useServiceBySlug = (slug: string) => {
  return useQuery({
    queryKey: [...queryKeys.services, 'slug', slug],
    queryFn: () => apiClient.getServiceBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook to get a service by ID
export const useServiceById = (id: string) => {
  return useQuery({
    queryKey: [...queryKeys.services, 'id', id],
    queryFn: () => apiClient.getServiceById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook to create a service
export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceData: Partial<Service>) => apiClient.createService(serviceData),
    onSuccess: () => {
      // Invalidate and refetch services
      queryClient.invalidateQueries({ queryKey: queryKeys.services });
      toast.success('Service created successfully!');
    },
    onError: (error) => {
      console.error('Create service failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Create service failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook to update a service
export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Service> }) =>
      apiClient.updateService(id, updates),
    onSuccess: () => {
      // Invalidate and refetch services
      queryClient.invalidateQueries({ queryKey: queryKeys.services });
      toast.success('Service updated successfully!');
    },
    onError: (error) => {
      console.error('Update service failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Update service failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook to delete a service
export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteService(id),
    onSuccess: () => {
      // Invalidate and refetch services
      queryClient.invalidateQueries({ queryKey: queryKeys.services });
      toast.success('Service deleted successfully!');
    },
    onError: (error) => {
      console.error('Delete service failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Delete service failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook to get admin overview data
export const useAdminOverview = () => {
  return useQuery({
    queryKey: queryKeys.adminOverview,
    queryFn: () => apiClient.getAdminOverview(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

// Custom hook to get pricing overview data
export const usePricingOverview = () => {
  return useQuery({
    queryKey: ['pricingOverview'],
    queryFn: () => apiClient.getPricingOverview(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook to update service pricing
export const useUpdateServicePrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ serviceId, plans }: {
      serviceId: string;
      plans: Array<{
        _id: string;
        price: {
          usd?: number;
          ngn?: number;
        };
      }>;
    }) => apiClient.updateServicePrice(serviceId, plans),
    onSuccess: () => {
      // Invalidate and refetch pricing overview
      queryClient.invalidateQueries({ queryKey: ['pricingOverview'] });
      toast.success('Service pricing updated successfully!');
    },
    onError: (error) => {
      console.error('Update service price failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Update service price failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook to apply inflation adjustment
export const useApplyInflationAdjustment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      percentage: number;
      currency: 'all' | 'usd' | 'ngn';
      reason?: string;
    }) => apiClient.applyInflationAdjustment(data),
    onSuccess: () => {
      // Invalidate and refetch pricing overview
      queryClient.invalidateQueries({ queryKey: ['pricingOverview'] });
      toast.success('Inflation adjustment applied successfully!');
    },
    onError: (error) => {
      console.error('Inflation adjustment failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Inflation adjustment failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook to add unavailable date
export const useAddUnavailableDate = () => {
  return useMutation({
    mutationFn: (data: {
      date: string;
      reason: string;
      type: 'holiday' | 'maintenance' | 'personal' | 'other';
    }) => apiClient.addUnavailableDate(data),
    onSuccess: () => {
      toast.success('Unavailable date added successfully!');
    },
    onError: (error) => {
      console.error('Add unavailable date failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Add unavailable date failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook to get pending consultations
export const usePendingConsultations = (range: number = 60) => {
  return useQuery({
    queryKey: ['pendingConsultations', range],
    queryFn: () => apiClient.getPendingConsultations(range),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Custom hook to update booking duration
export const useUpdateBookingDuration = () => {
  return useMutation({
    mutationFn: (data: { duration: number }) => apiClient.updateBookingDuration(data),
    onSuccess: () => {
      toast.success('Booking duration updated successfully!');
    },
    onError: (error) => {
      console.error('Update booking duration failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Update booking duration failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook to update booking status
export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { bookingId: string; status: string }) => apiClient.updateBookingStatus(data),
    onSuccess: () => {
      // Invalidate and refetch pending consultations
      queryClient.invalidateQueries({ queryKey: ['pendingConsultations'] });
      toast.success('Booking status updated successfully!');
    },
    onError: (error) => {
      console.error('Update booking status failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Update booking status failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook to initialize booking
export const useInitializeBooking = () => {
  return useQuery({
    queryKey: ['initializeBooking'],
    queryFn: () => apiClient.initializeBooking(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook to create booking
export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (data: {
      fullname: string;
      email: string;
      date: string;
      time: string;
      service: string;
    }) => apiClient.createBooking(data),
    onSuccess: (response) => {
      toast.success('Booking created successfully! Please check your email for OTP verification.');
    },
    onError: (error) => {
      console.error('Create booking failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Create booking failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook to verify booking
export const useVerifyBooking = () => {
  return useMutation({
    mutationFn: (data: {
      bookingId: string;
      otp: string;
    }) => apiClient.verifyBooking(data),
    onSuccess: (response) => {
      toast.success('Booking verified successfully!');
    },
    onError: (error) => {
      console.error('Verify booking failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Invalid OTP. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook to regenerate booking OTP
export const useRegenerateBookingOtp = () => {
  return useMutation({
    mutationFn: (data: { bookingId: string }) => apiClient.regenerateBookingOtp(data),
    onSuccess: () => {
      toast.success('New OTP sent to your email!');
    },
    onError: (error) => {
      console.error('Regenerate OTP failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to regenerate OTP. Please try again.';
      toast.error(errorMessage);
    },
  });
};

// Custom hook to cancel booking
export const useCancelBooking = () => {
  return useMutation({
    mutationFn: (data: { bookingId: string }) => apiClient.cancelBooking(data),
    onSuccess: () => {
      toast.success('Booking cancelled successfully!');
    },
    onError: (error) => {
      console.error('Cancel booking failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Cancel booking failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};