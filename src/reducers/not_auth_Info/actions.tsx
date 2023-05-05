import {
  ANSWER_DATE_OF_QUESTION_DAY,
  ANSWER_DATE_OF_TRIVIA_DAY,
  updateAnswerOfDateQuestionDayType,
  updateAnswerOfDateTriviaDayType,
  IupdateAnswerOfDateQuestionDayType
} from './types';

export function updateAnswerOfDateQuestionDay(data: IupdateAnswerOfDateQuestionDayType): updateAnswerOfDateQuestionDayType {
  return {
    type: ANSWER_DATE_OF_QUESTION_DAY,
    payload: data,
  };
}

export function updateAnswerOfDateTriviaDay(data: IupdateAnswerOfDateQuestionDayType): updateAnswerOfDateTriviaDayType {
  return {
    type: ANSWER_DATE_OF_TRIVIA_DAY,
    payload: data,
  };
}