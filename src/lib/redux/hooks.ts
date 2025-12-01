// Redux hooks for user details management
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { fetchUser, clearUserData } from './actions/userActions';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector);

// Custom hook for user details
export const useUserDetails = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state: RootState) => state.user);

  const fetchUserDetails = (userId: string) => {
    dispatch(fetchUser());
  };

  const clearUserDetails = () => {
    dispatch(clearUserData());
  };

  return {
    user,
    loading,
    error,
    fetchUserDetails,
    clearUserDetails,
  };
};