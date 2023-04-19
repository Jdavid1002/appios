import {
  SimulacrumActionTypes,
  SimulacrumState,
  SIMULACRUM_GET,
  SIMULACRUM_UPDATE,
} from './types';

const initialState: SimulacrumState = {
  data: null,
  status: null,
};

export function simulacrumReducer(
  state = initialState,
  action: SimulacrumActionTypes,
): SimulacrumState {
  switch (action.type) {
    case SIMULACRUM_GET:
      return {
        ...state,
        status: action.payload,
      };
    case SIMULACRUM_UPDATE:
      let newState = {
        ...state,
        data: {},
      };
      if (state.data) {
        newState.data = {
          ...state.data,
          ...action.payload,
        };
      } else {
        newState.data = {
          ...action.payload,
        };
      }
      return newState;
    default:
      return state;
  }
}
