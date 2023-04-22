import {UpdateProfile} from 'app_reducers/profile/types';
import {update as updateProfileAction} from 'app_reducers/profile/actions';
import {setUserData as setUserDataAction} from 'app_reducers/auth/actions';
import {
  get as getStatisticsAction,
  update as updateStatisticsAction,
} from 'app_reducers/statistics/actions';
import {
  get as getRankingsAction,
  update as updateRankingsAction,
} from 'app_reducers/rankings/actions';

import {Http, HttpCustomStructure} from 'app_utils/http';
import {Alert} from 'react-native';

export interface IFetchGamificationValues {
  force_calculation?:boolean
  alliance_id: string
  auth_token: string
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

  getStatistics = async (token: string,alliance_id : string, dispatch: any, params : any) => {
    dispatch(getStatisticsAction('loading'));

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: `/api/gamification-user-statistics/${alliance_id}/fetch-gamification-activity`,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }),
      params: params,
      auth_token: token
    };

    const data = await Http.send(query_data);

    if(data?.status !== 'success') {
      Alert.alert('Error!', data.message);
      return
    }

    const points = await this.fetchGamificationValues({
      force_calculation: true,
      alliance_id: alliance_id,
      auth_token: token,
    })

    let newCategories : any = {
      'accumulated' : {
        points : [],
        name : ''
      },
      'game' : {
        points : [],
        name : ''
      },
      'simulacrum' : {
        points : [],
        name : ''
      },
      'program_lesson' : {
        points : [],
        name : ''
      },
      'learning_way_lesson': {
        points : [],
        name : ''
      },
      'learning_way_diagnostic' : {
        points : [],
        name : ''
      },
      'diagnostic' : {
        points : [],
        name : ''
      }
    }

    for (const _log of data?.logs) {
      const gamification_values = _log?.gamification_values
      for (const _gamification of gamification_values) {
        const currentCategorieList = newCategories[_gamification?.name]?.points
        currentCategorieList.push(_gamification?.stats)
        newCategories = {
          ...newCategories,
          [_gamification?.name] : {
            points : currentCategorieList,
            name : _gamification?.description || _gamification?.name
          }
        }
      }
    }

    const formatCategories = Object.keys(newCategories)?.map((_id : string) => {
      const item = newCategories[_id]
      return {
        ...item,
        points : item?.points?.map((point : any) => Number(point.value)).reduce((a : any, b : any) => a + b, 0)
      }
    })

    const newStatistics = {
      categories : formatCategories,
      status : 'success',
      ...points
    }

    dispatch(updateStatisticsAction(newStatistics));
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

  fetchGamificationValues = async (params : IFetchGamificationValues) => {

    const {auth_token, alliance_id, force_calculation} = params

    let newParams = {}

    if(force_calculation){
      newParams = {...newParams, force_calculation}
    }

    try {
      const query_data: HttpCustomStructure = {
        method: 'POST',
        url: `/api/gamification-user-statistics/${alliance_id}/fetch-values`,
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: auth_token,
        }),
        params: newParams,
        auth_token: auth_token
      };
      const data = await Http.send(query_data);
      if (data?.status === 'success') {

        const newStatistics = {
          total : data?.gamification_level?.value,
          range : {
            init : {
              name : data?.gamification_level?.info?.level_name,
              points : data?.gamification_level?.info?.from
            },
            end : {
              name : 'Specialist',
              points : data?.gamification_level?.info?.to
            },
            percentage : ((data?.gamification_level?.value - data?.gamification_level?.info?.from) / data?.gamification_level?.info?.to) * 100
          },
        }

        return newStatistics
      } else {
        Alert.alert(data.message);
      }
    } catch (error) {
      console.log(error)
    }
  };
}

export default ProfileService;
