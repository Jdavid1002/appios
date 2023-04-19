import {
  SIMULACRUM_UPDATE,
  SIMULACRUM_GET,
  SimulacrumActionTypes,
  StatusType,
} from './types';

export function get(status: StatusType): SimulacrumActionTypes {
  return {
    type: SIMULACRUM_GET,
    payload: status,
  };
}

export function update(data: any): SimulacrumActionTypes {
  return {
    type: SIMULACRUM_UPDATE,
    payload: data,
  };
}
