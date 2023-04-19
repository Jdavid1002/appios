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
import StatisticsService from 'app_services/statistics/statistics';

class AuthService {

  setUserData = async (profile: Profile, dispatch: any) => {
    dispatch(setUserDataAction(profile));
  };

  login = async (credentials: any, props: any) => {
    const queryData: HttpCustomStructure = {
      method: 'POST',
      url: '/api/auth/login',
      params: credentials,
      headers: {
        'system-source': 'lms',
      },
    };

    const data = await Http.send(queryData);

    if (data.code === 200) {
      await this.loginPersist(data, props, credentials?.alliance_id);
      return data.token
    } else {
      Alert.alert('Error!', data.message);
    }
  };

  loginPersist = async (user_data: any, props: any, alliance_id : string) => {
    const simulacrumService = new SimulacrumService()
    const statisticsService = new StatisticsService()

    const lives = await simulacrumService.getLivesAvailable(user_data?.user?.id || user_data?.user?._id, user_data.token)
    const defaultGradientColors: string[] = [
      "#FD531E",
      "#B40056",
      "#172884",
      "#175807",
      "rgba(241,236,90,1)",
      "rgba(203,115,200,1)",
      "rgba(124,241,90,1)",
      "rgba(241,185,90,1)",
      "rgba(242,115,146,1)",
      "rgba(115,242,214,1)"
    ];
    const randomColor = Math.round(Math.random() * defaultGradientColors?.length - 1)

    const profile = user_data.user.profile
    const user: UserState = {
      user: {
        user_data: {
          fullname: `${profile?.first_name} ${profile?.last_name}`,
          avatar: user_data?.user?.avatar,
          color : defaultGradientColors[randomColor] || defaultGradientColors[0],
          email_address: profile?.email,
          birthdate: '',
          phone: profile.cell_phone,
          gender: profile.gender,
          program: user_data.user.programs[0],
        },
        lives: lives?.attempts,
        timestamp: new Date().getTime(),
        token: user_data.token,
        _id : user_data?.user?.id || user_data?.user?._id,
        alliance_id : alliance_id
      },
    };
    await props.dispatch(loginAction(user));

    const params = {
      nPerPage: "10",
      not_validate_alliance: false,
      not_validate_structure: false,
      not_validate_user: false,
      pageNumber: "1",
      structure_id: user_data.user.programs[0]?._id || ""
    };

    await statisticsService.getStatistics(user_data.token, alliance_id, props.dispatch, params)
  };


  getIqSecundariaID = async () => {
    const queryData: HttpCustomStructure = {
      method: 'GET',
      url: '/api/alliance/login/list',
      headers: {
        'system-source': 'lms',
      },
    };

    const data = await Http.send(queryData);

    if (data?.code === 200) {
      const IqSecundariaAlliance = data?.alliances?.find((item : any) => item?.name === 'IQ Secundaria')
      return IqSecundariaAlliance?._id
    } else {
      Alert.alert('Error!', data.message);
    }
  }



  logout = (dispatch: any) => dispatch(logoutAction());
  updateToken = (token: string, dispatch: any) => dispatch(updateToken(token));
}

export default AuthService;
