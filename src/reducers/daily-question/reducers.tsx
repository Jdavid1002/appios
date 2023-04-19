import {
  DailyQuestionActionTypes,
  DailyQuestionState,
  DAILY_QUESION_GET,
} from './types';

const initialState: DailyQuestionState = null;

export function dailyQuestionReducer(
  state = initialState,
  action: DailyQuestionActionTypes,
): DailyQuestionState {
  switch (action.type) {
    case DAILY_QUESION_GET:
      return action.payload;
    default:
      return state;
  }
}
