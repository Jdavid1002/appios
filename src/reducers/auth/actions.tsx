import {Profile} from '../../reducers/profile/types';
import {
  UserState,
  LOGIN,
  LOGOUT,
  UPDATE_TOKEN,
  AUTH_USER_UPDATE,
  AuthActionTypes,
  UPDATE_LIVES,
} from './types';

export function setUserData(profile: Profile): AuthActionTypes {
  return {
    type: AUTH_USER_UPDATE,
    payload: profile,
  };
}

export function updateToken(token: string): AuthActionTypes {
  return {
    type: UPDATE_TOKEN,
    payload: token,
  };
}

export function login(user: UserState): AuthActionTypes {
  return {
    type: LOGIN,
    payload: user,
  };
}

export function logout(): AuthActionTypes {
  return {
    type: LOGOUT,
    payload: null,
  };
}

export function updateLives(lives: number): AuthActionTypes {
  return {
    type: UPDATE_LIVES,
    payload: lives,
  };
}
