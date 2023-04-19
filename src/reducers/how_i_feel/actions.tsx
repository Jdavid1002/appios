import {IS_ACTIVE, HowIFeelTypes} from './types';

export function setIsActive(is_active: Boolean = false): HowIFeelTypes {
  return {
    type: IS_ACTIVE,
    payload: {is_active},
  };
}
