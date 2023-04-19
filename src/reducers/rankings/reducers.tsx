import {
  RankingsActionTypes,
  RankingsState,
  RANKINGS_GET,
  RANKINGS_UPDATE,
} from './types';

const initialState: RankingsState = {
  data: null,
  status: null,
};

export function rankingsReducer(
  state = initialState,
  action: RankingsActionTypes,
): RankingsState {
  switch (action.type) {
    case RANKINGS_GET:
      return {
        ...state,
        status: action.payload,
      };
    case RANKINGS_UPDATE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.type]: action.payload.data,
        },
      };
    default:
      return state;
  }
}
