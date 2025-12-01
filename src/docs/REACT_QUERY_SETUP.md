# API Integration

### 1. Dependencies Installed
- `@tanstack/react-query` - Core React Query library
- `@tanstack/react-query-devtools` - Development tools for debugging

### 2. Core Files Created

#### API Client (`src/lib/api/client.ts`)
- Configured base URL: `https://official-rq05.onrender.com/api/v1`
- JWT token management (localStorage)
- Automatic Authorization headers
- Error handling for HTTP responses

#### React Query Hooks (`src/lib/api/hooks.ts`)
- `useLogin()` - Login with email or username
- `useSignup()` - User registration
- `useLogout()` - Logout and clear session
- `useForgotPassword()` - Password reset request
- `useResetPassword()` - Password reset with token
- `useAuth()` - Check authentication status
- `useUser()` - Get current user data

#### Authentication Context (`src/lib/api/auth-context.tsx`)
- Global authentication state management
- Auth provider wrapper component
- Context hooks for easy access to auth state

#### Protected Routes (`src/components/ProtectedRoute.tsx`)
- Route protection wrapper component
- Role-based access control
- HOC for protecting components
- Permission checking hooks

#### Providers Setup (`src/components/Providers.tsx`)
- React Query configuration
- Combined providers for app wrapper
- Query client setup with optimal defaults

#### Redux Store (`src/lib/redux/store.ts`)
- Redux store configuration with middleware
- User state management
- TypeScript support for state and actions

#### Redux Types (`src/lib/redux/types.ts`)
- User interface definition
- Action types and interfaces
- State structure definitions

#### Redux Actions (`src/lib/redux/actions/userActions.ts`)
- Async thunk for fetching user details
- Action creators for user state management
- Error handling for API failures

#### Redux Hooks (`src/lib/redux/hooks.ts`)
- Typed useDispatch and useSelector hooks
- Custom useUserDetails hook for user data

### 3. Updated Files

#### Layout (`src/app/layout.tsx`)
- Added Providers wrapper for React Query and Auth

#### Authentication Pages
- **Sign In** (`src/app/sign-in/page.tsx`) - Updated to use React Query
- **Sign Up** (`src/app/sign-up/page.tsx`) - Updated to use React Query

#### Protected Routes
- **Dashboard** (`src/app/dashboard/layout.tsx`) - Protected for authenticated users
- **Admin** (`src/app/admin/layout.tsx`) - Protected for admin users only

## API Endpoints Available

### Authentication
- `POST /users/signup` - User registration
- `POST /users/login` - Login (email or username)
- `GET /users/logout` - Logout
- `POST /users/forgotPassword` - Request password reset
- `PATCH /users/resetPassword/:token` - Reset password with token

### User Data Structure
```typescript
interface User {
  id: string;
  _id?: string;
  name: string;
  username: string;
  email: string;
  role: string;
  photo?: string;
  activities?: unknown[];
  progress?: number;
  serviceOrders?: unknown[];
  bookings?: unknown[];
  __v?: number;
}
```

## Redux Integration for User Data

The application uses Redux for managing detailed user information beyond basic authentication. This provides persistent state management and caching for user data.

### Key Concepts

- **Authentication Context**: Handles login/logout and basic auth state
- **Redux Store**: Manages detailed user profile data, activities, progress, etc.
- **React Query**: Handles API mutations (login, signup, etc.)
- **Redux**: Handles user data fetching and state persistence

### Redux User State Structure
```typescript
interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
```

## Usage Examples

### Using Authentication in Components
```typescript
import { useAuthContext } from '../lib/api/auth-context';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthContext();
  
  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }
  
  return <p>Welcome, {user.name}!</p>;
}
```

### Using React Query Hooks
```typescript
import { useLogin, useSignup, useLogout } from '../lib/api/hooks';

function LoginForm() {
  const loginMutation = useLogin();
  
  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync({
        identifier: 'user@example.com', // or username
        password: 'password123'
      });
      // Redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <button onClick={handleLogin} disabled={loginMutation.isPending}>
      {loginMutation.isPending ? 'Logging in...' : 'Login'}
    </button>
  );
}
```

### Protecting Routes
```typescript
import { ProtectedRoute } from '../components/ProtectedRoute';

// For authenticated users only
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// For specific roles only
<ProtectedRoute requiredRole="admin">
  <AdminPanel />
</ProtectedRoute>

// Custom redirect
<ProtectedRoute redirectTo="/login">
  <Profile />
</ProtectedRoute>
```

### Permission Checking
```typescript
import { usePermissions } from '../components/ProtectedRoute';

function AdminControls() {
  const { isAdmin, canAccess } = usePermissions();

  if (!isAdmin()) {
    return <p>Access denied</p>;
  }

  return <AdminPanel />;
}
```

### Using Redux for User Data
```typescript
import { useUserDetails } from '../lib/redux/hooks';

function UserProfile() {
  const { user, loading, error, fetchUserDetails } = useUserDetails();

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data available</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Progress: {user.progress}%</p>
      {user.photo && <img src={user.photo} alt="Profile" />}
    </div>
  );
}
```

### Fetching User Details
```typescript
import { useUserDetails } from '../lib/redux/hooks';
import { useAuthContext } from '../lib/api/auth-context';

function Dashboard() {
  const { user: authUser, isAuthenticated } = useAuthContext();
  const { user: detailedUser, loading, fetchUserDetails } = useUserDetails();

  // Fetch detailed user data when authenticated but no Redux data
  React.useEffect(() => {
    if (isAuthenticated && authUser && !detailedUser && !loading) {
      const userId = authUser.id || authUser._id;
      if (userId) {
        fetchUserDetails(userId);
      }
    }
  }, [isAuthenticated, authUser, detailedUser, loading, fetchUserDetails]);

  return (
    <div>
      {detailedUser ? (
        <UserDashboard user={detailedUser} />
      ) : (
        <LoadingDashboard />
      )}
    </div>
  );
}
```

## Architecture Overview

### Data Flow Pattern
1. **Authentication**: React Query handles login/signup mutations
2. **User Data**: Redux manages detailed user profile and activities
3. **API Calls**: React Query for data fetching, mutations, and caching
4. **State Sync**: Auth context syncs with Redux for user data

### Best Practices for API Integration

#### 1. Use React Query for Server State
- Data that comes from the server (API responses)
- Asynchronous operations (mutations)
- Cache management and synchronization

#### 2. Use Redux for Client State
- Complex state relationships
- Data that needs to persist across navigation
- State that multiple components depend on

#### 3. Error Handling Strategy
```typescript
// Centralized error handling
const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        // Redirect to login
        break;
      case 403:
        // Show permission error
        break;
      default:
        // Show generic error
    }
  }
};
```

#### 4. Loading States
```typescript
// Consistent loading patterns
function DataComponent() {
  const { data, isLoading, error } = useQuery({...});

  if (isLoading) return <SkeletonLoader />;
  if (error) return <ErrorMessage error={error} />;
  return <DataDisplay data={data} />;
}
```

## Features Implemented

### Authentication Flow
- [x] User registration with validation
- [x] Login with email or username
- [x] JWT token management
- [x] Automatic token inclusion in API requests
- [x] Logout functionality
- [x] Password reset flow

### Route Protection
- [x] Protected route wrapper
- [x] Role-based access control
- [x] Automatic redirects
- [x] Loading states during auth check

### React Query Integration
- [x] Query client setup with optimized defaults
- [x] Automatic retries (except 401/403)
- [x] Cache management
- [x] Loading and error states
- [x] DevTools integration

### Redux Integration
- [x] User data state management
- [x] Async thunk actions for API calls
- [x] Error handling and loading states
- [x] TypeScript support for state

### Error Handling
- [x] HTTP error responses
- [x] Network error handling
- [x] User-friendly error messages
- [x] Automatic logout on 401 errors

## Testing the Setup

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test signup flow:**
   - Visit `/sign-up`
   - Create a new account
   - Should redirect to `/dashboard` on success

3. **Test login flow:**
   - Visit `/sign-in`
   - Login with email or username
   - Should redirect to `/dashboard` on success

4. **Test route protection:**
   - Try accessing `/dashboard` without login (should redirect to `/sign-in`)
   - Try accessing `/admin` without admin role (should redirect to `/dashboard`)

5. **Test Redux user data:**
   - After login, check Redux DevTools for user state
   - Verify user details are fetched and stored
   - Test user data persistence across page refreshes

6. **Test logout:**
   - Add logout functionality to dashboard
   - Should clear session and redirect to login
   - Verify Redux state is cleared

7. **Test API error handling:**
   - Simulate network errors
   - Test 401/403 error scenarios
   - Verify proper error messages and redirects

## Continuing API Integration

### For Frontend Developers

When working on new features that require API integration, follow this workflow:

#### 1. Check Existing API Endpoints
- Review `src/lib/api/client.ts` for existing API methods
- Check `src/lib/api/hooks.ts` for existing React Query hooks
- Look at Redux actions in `src/lib/redux/actions/` for data fetching patterns

#### 2. Adding New API Endpoints
```typescript
// In src/lib/api/client.ts
export const getUserProjects = (userId: string) =>
  apiClient.get(`/users/${userId}/projects`);

export const updateUserProfile = (userId: string, data: Partial<User>) =>
  apiClient.patch(`/users/${userId}`, data);
```

#### 3. Creating React Query Hooks
```typescript
// In src/lib/api/hooks.ts
export const useUserProjects = (userId: string) => {
  return useQuery({
    queryKey: ['userProjects', userId],
    queryFn: () => getUserProjects(userId),
    enabled: !!userId,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Partial<User> }) =>
      updateUserProfile(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
```

#### 4. Adding Redux State (if needed)
For complex state management or data that needs to persist across components:

```typescript
// In src/lib/redux/types.ts
export interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  // ... other fields
}

export interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}
```

#### 5. Component Integration
```typescript
import { useUserProjects } from '../lib/api/hooks';
import { useUserDetails } from '../lib/redux/hooks';

function ProjectsList() {
  const { user } = useUserDetails();
  const { data: projects, isLoading, error } = useUserProjects(user?.id || '');

  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects</div>;

  return (
    <ul>
      {projects?.map(project => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}
```

#### 6. Error Handling Patterns
```typescript
// Global error handling in components
const { data, error, isError } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
});

if (isError) {
  // Handle error - show toast, redirect, etc.
  console.error('API Error:', error);
}
```

#### 7. Testing API Integration
- Test with mock data first
- Use React Query DevTools to inspect cache
- Test loading states and error scenarios
- Verify authentication requirements

## Next Steps

1. **Add logout button** to dashboard header
2. **Create forgot password page** (`/forgot-password`)
3. **Create reset password page** (`/reset-password/:token`)
4. **Add user menu** with profile/settings options
5. **Implement refresh token** functionality
6. **Add API endpoints** for user data, dashboard stats, etc.
7. **Create reusable components** for common API operations
8. **Add optimistic updates** for better UX
9. **Implement proper error boundaries**
10. **Add API response caching strategies**

## Environment Variables

For production deployment, consider:
- `NEXT_PUBLIC_API_URL` - For the API base URL
- `NODE_ENV` - For React Query DevTools (auto-disabled in production)

## Security Notes

- JWT tokens are stored in localStorage (consider httpOnly cookies for production)
- Automatic retry is disabled for 401/403 errors
- All protected routes check authentication on mount
- Role-based access control for admin/instructor features