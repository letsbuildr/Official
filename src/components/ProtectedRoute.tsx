// Protected route wrapper component
'use client';

import React, { ReactNode, useEffect } from 'react';
import { useAuthContext } from '../lib/api/auth-context';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string; // Optional role requirement (e.g., 'admin', 'instructor')
  redirectTo?: string; // Optional custom redirect path
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/sign-in',
}) => {
  const { isAuthenticated, user, isLoading } = useAuthContext();
  const router = useRouter();

  // Handle redirection logic
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
      } else if (requiredRole && user?.role !== requiredRole) {
        // Redirect to unauthorized page or dashboard based on your needs
        router.push('/dashboard'); // Or create a dedicated unauthorized page
      }
    }
  }, [isLoading, isAuthenticated, redirectTo, requiredRole, user?.role, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render children if not authenticated or role doesn't match
  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
};

// Higher-order component for protecting pages
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: {
    requiredRole?: string;
    redirectTo?: string;
  } = {}
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    return (
      <ProtectedRoute
        requiredRole={options.requiredRole}
        redirectTo={options.redirectTo}
      >
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };

  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthenticatedComponent;
};

// Hook for checking permissions
export const usePermissions = () => {
  const { user } = useAuthContext();

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  const isInstructor = (): boolean => {
    return hasRole('instructor');
  };

  const isUser = (): boolean => {
    return hasRole('user');
  };

  const canAccess = (requiredRole: string): boolean => {
    if (requiredRole === 'user') {
      return isAuthenticated();
    }
    return hasRole(requiredRole);
  };

  const isAuthenticated = (): boolean => {
    return !!user;
  };

  return {
    user,
    hasRole,
    isAdmin,
    isInstructor,
    isUser,
    canAccess,
    isAuthenticated,
  };
};