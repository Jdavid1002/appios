import {PROFILE_UPDATE, ProfileState, ProfileActionTypes} from './types';

const initialState: ProfileState = null;

export function profileReducer(
  state = initialState,
  action: ProfileActionTypes,
): ProfileState {
  switch (action.type) {
    case PROFILE_UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
