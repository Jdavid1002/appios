import {Profile} from '../../reducers/profile/types';

export const AUTH_USER_UPDATE = 'AUTH_USER_UPDATE';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_LIVES = 'UPDATE_LIVES';

export interface User {
  user_data?: Profile;
  timestamp?: number;
  token?: string;
  _id: string;
  alliance_id: string;
  lives: number
}

export interface UserState {
  user?: User;
}

interface AuthUpdateAction {
  type: typeof AUTH_USER_UPDATE;
  payload: Profile;
}

interface UpdateTokenAction {
  type: typeof UPDATE_TOKEN;
  payload: string;
}

interface LoginAction {
  type: typeof LOGIN;
  payload: UserState;
}

interface LogoutAction {
  type: typeof LOGOUT;
  payload: null;
}

interface UpdateLIves {
  type: typeof UPDATE_LIVES
  payload: number
}


export type AuthActionTypes =
  | LoginAction
  | LogoutAction
  | AuthUpdateAction
  | UpdateTokenAction
  | UpdateLIves;
