import {
  ANSWER_DATE_OF_QUESTION_DAY,
  ANSWER_DATE_OF_TRIVIA_DAY,
  updateAnswerOfDateQuestionDayType,
  updateAnswerOfDateTriviaDayType
} from './types';

export function updateAnswerOfDateQuestionDay(data: Date | string): updateAnswerOfDateQuestionDayType {
  return {
    type: ANSWER_DATE_OF_QUESTION_DAY,
    payload: data,
  };
}

export function updateAnswerOfDateTriviaDay(data: Date | string): updateAnswerOfDateTriviaDayType {
  return {
    type: ANSWER_DATE_OF_TRIVIA_DAY,
    payload: data,
  };
}