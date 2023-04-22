import {
  setUserData as setUserDataAction,
  login as loginAction,
  logout as logoutAction,
  updateToken,
} from 'app_reducers/auth/actions';
import {UserState} from 'app_reducers/auth/types';
import {Http, HttpCustomStructure} from 'app_utils/http';
import {Alert} from 'react-native';
import {Profile} from 'app_reducers/profile/types';
import SimulacrumService from 'app_services/simulacrum/simulacrum';
import ProfileService from 'app_services/profile';

interface IFetchRankingGamification {
  user_id: string // Identificador del usuario
  alliance_id: string // Identificador de la allianza
  structure_id?: string // Identificador de la estructura
}


export interface IGetNationalityRanking {
  alliance_id : string
  auth_token : string
  query_params : IFetchRankingGamification
}

export interface IGetLocationRanking {
  alliance_id : string
  auth_token : string
  query_params : IFetchRankingGamification
}


class StatisticsService {

  getNationalityRanking = async (_params : IGetNationalityRanking) => {

    const { alliance_id , auth_token , query_params} = _params;

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: `/api/gamification-user-statistics/${alliance_id}/ranking-nationality`,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth_token,
      }),
      params: query_params,
      auth_token: auth_token
    };


    const data = await Http.send(query_data);


    if (data?.code === 200) {
      return data
    } else {
      Alert.alert('Error!', data.message);
    }
  }


  getLocationRanking = async (_params : IGetNationalityRanking) => {

    const { alliance_id , auth_token , query_params} = _params;

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: `/api/gamification-user-statistics/${alliance_id}/ranking-location`,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth_token,
      }),
      params: query_params,
      auth_token: auth_token
    };


    const data = await Http.send(query_data);

    if (data?.code === 200) {
      return data
    } else {
      Alert.alert('Error!', data.message);
    }
  }

}

export default StatisticsService;
