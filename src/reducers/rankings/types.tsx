export const RANKINGS_UPDATE = 'RANKINGS_UPDATE';
export const RANKINGS_GET = 'RANKINGS_GET';

export type RankingType = null | any;
export type StatusType = null | 'loading';

export interface RankingsType {
  all: RankingType;
  district: RankingType;
  institution: RankingType;
}

export interface RankingsState {
  data: RankingsType | null;
  status: StatusType;
}

interface GetAction {
  type: typeof RANKINGS_GET;
  payload: StatusType;
}

interface UpdateAction {
  type: typeof RANKINGS_UPDATE;
  payload: any;
}

export type RankingsActionTypes = UpdateAction | GetAction;
