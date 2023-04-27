export const DAILY_QUESION_GET = 'DAILY_QUESION_GET';

export type DailyQuestionType = {
  academic_resource_config : string
  currentSection : string
  questions : DailyQuestionTypeQuestions[]
  academic_resource: string
  academic_resource_config_category:string
  title: string
  questionsByConfiguration: any
} | any


export type DailyQuestionTypeQuestions = {
  _id: string
  alliance_id: string
  answers: DailyQuestionTypeAnswers[]
  config: any[]
  content: string
  created_at: Date | string
  incremental_code: number
  metadata: any[]
  question_category: string
  tags: any[]
  updated_at: Date | string
}


export type DailyQuestionTypeAnswers = {
  _id: string
  config:{
    fill_in_spaces: any[]
    relate_item: string
  }
  content: string
  is_correct: boolean
  unique: string
  value: number
}

export type DailyQuestionState = DailyQuestionType | null;

interface GetAction {
  type: typeof DAILY_QUESION_GET;
  payload: DailyQuestionType;
}

export type DailyQuestionActionTypes = GetAction;
