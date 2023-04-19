import {IS_ACTIVE, HowIFeelState, HowIFeelTypes} from './types';

const initState: HowIFeelState = {
  is_active: false,
};

export function howIFeelReducer(
  state: HowIFeelState = initState,
  action: HowIFeelTypes,
): HowIFeelState {
  switch (action.type) {
    case IS_ACTIVE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
