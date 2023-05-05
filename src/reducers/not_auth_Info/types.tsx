export const ANSWER_DATE_OF_QUESTION_DAY = 'ANSWER_DATE_OF_QUESTION_DAY';
export const ANSWER_DATE_OF_TRIVIA_DAY = 'ANSWER_DATE_OF_TRIVIA_DAY';

export interface IupdateAnswerOfDateQuestionDayType {
  date : Date | string;
  _id : string;
}

export interface initialStateAuthInfoActionTypes {
  answerOfDateQuestionDay: IupdateAnswerOfDateQuestionDayType;
  answerOfDateTriviaDay: IupdateAnswerOfDateQuestionDayType;
}

export interface updateAnswerOfDateQuestionDayType {
  type: typeof ANSWER_DATE_OF_QUESTION_DAY;
  payload: IupdateAnswerOfDateQuestionDayType;
}

export interface updateAnswerOfDateTriviaDayType {
  type: typeof ANSWER_DATE_OF_TRIVIA_DAY;
  payload: IupdateAnswerOfDateQuestionDayType;
}

export type NotAuthInfoActionTypes =
  | updateAnswerOfDateQuestionDayType
  | updateAnswerOfDateTriviaDayType