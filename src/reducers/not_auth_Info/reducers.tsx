import {
  NotAuthInfoActionTypes,
  initialStateAuthInfoActionTypes,
  ANSWER_DATE_OF_QUESTION_DAY,
  ANSWER_DATE_OF_TRIVIA_DAY
} from './types';

const initialState: initialStateAuthInfoActionTypes = {
  answerOfDateQuestionDay : {
    date : '',
    _id : ''
  },
  answerOfDateTriviaDay : {
    date : '',
    _id : ''
  },
};

export function notAuthInfo(
  state: initialStateAuthInfoActionTypes = initialState,
  action: NotAuthInfoActionTypes,
): initialStateAuthInfoActionTypes {

  switch (action.type) {
    
    case ANSWER_DATE_OF_QUESTION_DAY:
      return {
        ...state,
        answerOfDateQuestionDay : action.payload,
      };

    case ANSWER_DATE_OF_TRIVIA_DAY:
      return {
        ...state,
        answerOfDateTriviaDay : action.payload,
      };
    
    default:
      return state;
  }
}
