import {
  STATISTICS_UPDATE,
  STATISTICS_GET,
  StatisticsActionTypes,
  StatusType,
} from './types';

export function get(status: StatusType): StatisticsActionTypes {
  return {
    type: STATISTICS_GET,
    payload: status,
  };
}

export function update(data: any): StatisticsActionTypes {
  return {
    type: STATISTICS_UPDATE,
    payload: data,
  };
}
