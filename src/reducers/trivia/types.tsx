export const TRIVIA_GET = 'TRIVIA_GET';

export type TriviaType = {
  _id: string
  alliance_id: string
  answers: TriviaAnswers[]
  config: {
    order_of_answers: string
    type_input: string
  }
  content: string
  created_at: string | Date
  incremental_code: number
  metadata: any[]
  question_category: string
  tags: any[]
  updated_at: string | Date
};


export type TriviaAnswers = {
  _id: string
  config: any
  content: string
  is_correct: boolean
  unique: string
  value: number
}

export type TriviaState = TriviaType

interface GetAction {
  type: typeof TRIVIA_GET;
  payload: TriviaType;
}

export type TriviaActionTypes = GetAction;
