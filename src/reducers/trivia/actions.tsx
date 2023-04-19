import {TRIVIA_GET, TriviaActionTypes, TriviaState} from './types';

export function get(data: TriviaState): TriviaActionTypes {
  return {
    type: TRIVIA_GET,
    payload: data,
  };
}
