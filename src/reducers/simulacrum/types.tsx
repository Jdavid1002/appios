import {} from './types';

export const SIMULACRUM_UPDATE = 'SIMULACRUM_UPDATE';
export const SIMULACRUM_GET = 'SIMULACRUM_GET';

export type SimulacrumType = null | any;
export type StatusType = null | 'loading';



export interface SimulacrumState {
  data: SimulacrumType;
  status: StatusType;
}

interface GetAction {
  type: typeof SIMULACRUM_GET;
  payload: StatusType;
}

interface UpdateAction {
  type: typeof SIMULACRUM_UPDATE;
  payload: any;
}

export type SimulacrumActionTypes = UpdateAction | GetAction;