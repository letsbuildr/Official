// Redux actions for user details management
import { Dispatch } from 'redux';
import { apiClient } from '../../api/client';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  CLEAR_USER_DATA,
  UserActionTypes,
  User,
} from '../types';

// Action creators
export const fetchUserRequest = (): UserActionTypes => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (user: User): UserActionTypes => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error: string): UserActionTypes => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const clearUserData = (): UserActionTypes => ({
  type: CLEAR_USER_DATA,
});

// Thunk action to fetch current user details
export const fetchUser = () => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch(fetchUserRequest());
    try {
      console.log('Fetching current user');
      console.log('Is authenticated:', apiClient.isAuthenticated());

      if (!apiClient.isAuthenticated()) {
        dispatch(fetchUserFailure('User not authenticated'));
        return;
      }

      const response = await apiClient.getCurrentUser();
      console.log('API Response:', response);

      if (response.data) {
        console.log('User data found:', response.data);
        dispatch(fetchUserSuccess(response.data));
      } else {
        console.log('No user data in response');
        dispatch(fetchUserFailure('No user data received'));
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user details';
      dispatch(fetchUserFailure(errorMessage));
    }
  };
};