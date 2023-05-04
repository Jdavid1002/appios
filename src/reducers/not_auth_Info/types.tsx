export const ANSWER_DATE_OF_QUESTION_DAY = 'ANSWER_DATE_OF_QUESTION_DAY';
export const ANSWER_DATE_OF_TRIVIA_DAY = 'ANSWER_DATE_OF_TRIVIA_DAY';

export interface initialStateAuthInfoActionTypes {
  answerOfDateQuestionDay: Date | string;
  answerOfDateTriviaDay: Date | string;
}

export interface updateAnswerOfDateQuestionDayType {
  type: typeof ANSWER_DATE_OF_QUESTION_DAY;
  payload: Date | string;
}

export interface updateAnswerOfDateTriviaDayType {
  type: typeof ANSWER_DATE_OF_TRIVIA_DAY;
  payload: Date | string;
}

export type NotAuthInfoActionTypes =
  | updateAnswerOfDateQuestionDayType
  | updateAnswerOfDateTriviaDayType