export const TRIVIA_GET = 'TRIVIA_GET';

export type TriviaType = any;

export type TriviaState = TriviaType | null;

interface GetAction {
  type: typeof TRIVIA_GET;
  payload: TriviaType;
}

export type TriviaActionTypes = GetAction;
