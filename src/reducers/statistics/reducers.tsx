import {
  StatisticsActionTypes,
  StatisticsState,
  STATISTICS_GET,
  STATISTICS_UPDATE,
} from './types';

const initialState: StatisticsState = {
  data: null,
  status: null,
};

export function statisticsReducer(
  state = initialState,
  action: StatisticsActionTypes,
): StatisticsState {
  switch (action.type) {
    case STATISTICS_GET:
      return {
        ...state,
        status: action.payload,
      };
    case STATISTICS_UPDATE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
