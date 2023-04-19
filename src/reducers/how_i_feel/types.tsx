export const IS_ACTIVE = 'IS_ACTIVE';

export interface HowIFeelState {
  is_active?: Boolean;
}

interface IsActiveAction {
  type: typeof IS_ACTIVE;
  payload: {
    is_active: Boolean;
  };
}

export type HowIFeelTypes = IsActiveAction;
