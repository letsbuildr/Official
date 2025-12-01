// Redux types for user details management

export interface User {
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


export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Action types
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

// Action interfaces
export interface FetchUserRequestAction {
  type: typeof FETCH_USER_REQUEST;
}

export interface FetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS;
  payload: User;
}

export interface FetchUserFailureAction {
  type: typeof FETCH_USER_FAILURE;
  payload: string;
}

export interface ClearUserDataAction {
  type: typeof CLEAR_USER_DATA;
}

export type UserActionTypes =
  | FetchUserRequestAction
  | FetchUserSuccessAction
  | FetchUserFailureAction
  | ClearUserDataAction;