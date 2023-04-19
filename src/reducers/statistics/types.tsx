import {} from './types';

export const STATISTICS_UPDATE = 'STATISTICS_UPDATE';
export const STATISTICS_GET = 'STATISTICS_GET';

export type StatisticsType = null | any;
export type StatusType = null | 'loading';

export interface StatisticsState {
  data: StatisticsType;
  status: StatusType;
}

interface GetAction {
  type: typeof STATISTICS_GET;
  payload: StatusType;
}

interface UpdateAction {
  type: typeof STATISTICS_UPDATE;
  payload: any;
}

export type StatisticsActionTypes = UpdateAction | GetAction;
