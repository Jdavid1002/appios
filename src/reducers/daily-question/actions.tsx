import {
  DAILY_QUESION_GET,
  DailyQuestionActionTypes,
  DailyQuestionState,
} from './types';

export function get(data: DailyQuestionState): DailyQuestionActionTypes {
  return {
    type: DAILY_QUESION_GET,
    payload: data,
  };
}
