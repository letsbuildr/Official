// Redux reducer for user details management
import { Reducer } from 'redux';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  CLEAR_USER_DATA,
  UserState,
  UserActionTypes,
} from '../types';

// Initial state
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Reducer function
export const userReducer: Reducer<UserState, UserActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        user: null,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};