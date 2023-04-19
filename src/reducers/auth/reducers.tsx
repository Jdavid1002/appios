import {
  UserState,
  User,
  AuthActionTypes,
  LOGIN,
  LOGOUT,
  UPDATE_TOKEN,
  AUTH_USER_UPDATE,
  UPDATE_LIVES,
} from './types';

const initialState: UserState = {};

export function authReducer(
  state: UserState = initialState,
  action: AuthActionTypes,
): UserState {
  switch (action.type) {
    case AUTH_USER_UPDATE:
      const user: User = {
        ...state.user,
        user_data: action.payload,
      };

      return {
        ...state,
        user,
      };
    case LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return initialState;
    case UPDATE_TOKEN: {
      const user: User = {
        ...state.user,
        token: action.payload,
      };
      return {
        ...state,
        user,
      };
    }
    case UPDATE_LIVES: {
      const user: User = {
        ...state.user,
        lives: action.payload,
      };
      return {
        ...state,
        user
      }
    }
    default:
      return state;
  }
}
