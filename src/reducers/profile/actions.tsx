import { Profile, PROFILE_UPDATE, ProfileActionTypes } from './types';

export function update(profile: Profile): ProfileActionTypes {
  return {
    type: PROFILE_UPDATE,
    payload: profile,
  };
}
