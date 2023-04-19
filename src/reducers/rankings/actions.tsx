import {
  RANKINGS_UPDATE,
  RANKINGS_GET,
  RankingsActionTypes,
  StatusType,
} from './types';

export function get(status: StatusType): RankingsActionTypes {
  return {
    type: RANKINGS_GET,
    payload: status,
  };
}

export function update(type: string, data: any): RankingsActionTypes {
  return {
    type: RANKINGS_UPDATE,
    payload: {type, data},
  };
}
