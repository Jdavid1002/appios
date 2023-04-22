export const DAILY_QUESION_GET = 'DAILY_QUESION_GET';

export type DailyQuestionType = {
  status : string
  questions : {
    description : string
    level : string
  }[]
  matter_id : string
} | any;

export type DailyQuestionState = DailyQuestionType | null;

interface GetAction {
  type: typeof DAILY_QUESION_GET;
  payload: DailyQuestionType;
}

export type DailyQuestionActionTypes = GetAction;
