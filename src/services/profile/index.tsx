import {UpdateProfile} from '../../reducers/profile/types';
import {update as updateProfileAction} from '../../reducers/profile/actions';
import {setUserData as setUserDataAction} from '../../reducers/auth/actions';
import {
  get as getRankingsAction,
  update as updateRankingsAction,
} from '../../reducers/rankings/actions';

import {Http, HttpCustomStructure} from '../../utils/http';
import {Alert} from 'react-native';

export interface IGetFetchGamificationValuesAndTransformData {
  force_calculation?: boolean;
  alliance_id: string;
  auth_token: string;
}

class ProfileService {
  getMe = async (token: string, dispatch: any) => {
    const query_data: HttpCustomStructure = {
      method: 'GET',
      url: '/api/user/user-info',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };

    const data = await Http.send(query_data);

    if (data.status === 'success') {
      dispatch(updateProfileAction(data.user));
      dispatch(setUserDataAction(data.user));
    } else {
      Alert.alert('Error!', data.message);
    }
  };

  updateMe = async (profile: Partial<UpdateProfile>, token: string) => {
    const query_data: HttpCustomStructure = {
      method: 'PUT',
      url: '/api/user/update-info',
      params: profile,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };

    const data = await Http.send(query_data);

    if (data.status === 'success') {
    } else {
      Alert.alert('Error!', data.message);
    }
  };

  getRankings = async (params: any, token: string, dispatch: any) => {
    dispatch(getRankingsAction('loading'));

    const paramString = `${Object.keys(params)
      .map(key => key + '=' + params[key])
      .join('&')}`;

    const query_data: HttpCustomStructure = {
      method: 'GET',
      url: `/api/brains/ranking?${paramString}`,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };

    const data = await Http.send(query_data);

    if (data.status === 'success') {
      dispatch(updateRankingsAction(params.type, data));
      dispatch(getRankingsAction(null));
    } else {
      // Alert.alert('Error!', data.message);
    }
  };
}

export default ProfileService;
