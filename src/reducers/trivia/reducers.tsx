import {TriviaActionTypes, TriviaState, TRIVIA_GET} from './types';

const initialState: TriviaState = null;

export function triviaReducer(
  state = initialState,
  action: TriviaActionTypes,
): TriviaState {
  switch (action.type) {
    case TRIVIA_GET:
      return action.payload;
    default:
      return state;
  }
}
