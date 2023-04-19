export const DAILY_QUESION_GET = 'DAILY_QUESION_GET';

export type DailyQuestionType = any;

export type DailyQuestionState = DailyQuestionType | null;

interface GetAction {
  type: typeof DAILY_QUESION_GET;
  payload: DailyQuestionType;
}

export type DailyQuestionActionTypes = GetAction;
