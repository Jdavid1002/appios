export const PROFILE_UPDATE = 'PROFILE_UPDATE';

export interface Profile {
  fullname: string;
  avatar: string;
  email_address: string;
  birthdate: string | Date;
  phone: string;
  gender: 'Masculino' | 'Femenino' | string;
  program: any
  color: string;
}

export interface UpdateProfile {
  first_name: string;
  last_name: string;
  email_address: string;
  birthdate: string | Date;
  phone: string;
  sex: 'male' | 'female' | string;
  password: string;
}

export type ProfileState = null | Profile;

interface UpdateAction {
  type: typeof PROFILE_UPDATE;
  payload: Profile;
}

export type ProfileActionTypes = UpdateAction;
