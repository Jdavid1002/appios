import {
  setUserData as setUserDataAction,
  login as loginAction,
  logout as logoutAction,
  updateToken,
} from '../../reducers/auth/actions';
import {UserState} from '../../reducers/auth/types';
import {Http, HttpCustomStructure} from '../../utils/http';
import {Alert} from 'react-native';
import {Profile} from '../../reducers/profile/types';
import SimulacrumService from '../../services/simulacrum/simulacrum';
import ProfileService from '../../services/profile';
import { updateAnswerOfDateQuestionDay, updateAnswerOfDateTriviaDay } from '../../reducers/not_auth_Info/actions';
import { store } from '../../storage/redux-storage';

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
      return data.token;
    } else {
      Alert.alert('Error!', data.message);
    }
  };

  loginPersist = async (user_data: any, props: any, alliance_id: string) => {

    const storeObject = store

    if(user_data?.user?.id !== storeObject.getState()?.notAuthInfo?.answerOfDateQuestionDay?._id){

      props.dispatch(updateAnswerOfDateQuestionDay({
        date : '',
        _id : user_data?.user?.id || user_data?.user?._id
      }))

      props.dispatch(updateAnswerOfDateTriviaDay({
        date : '',
        _id : user_data?.user?.id || user_data?.user?._id
      }))

    }

    const simulacrumService = new SimulacrumService();
    const profileService = new ProfileService();

    const lives = await simulacrumService.getLivesAvailable(
      user_data?.user?.id || user_data?.user?._id,
      user_data.token,
    );
    
    const defaultGradientColors: string[] = [
      '#FD531E',
      '#B40056',
      '#172884',
      '#175807',
      'rgba(241,236,90,1)',
      'rgba(203,115,200,1)',
      'rgba(124,241,90,1)',
      'rgba(241,185,90,1)',
      'rgba(242,115,146,1)',
      'rgba(115,242,214,1)',
    ];

    const randomColor = Math.round(
      Math.random() * defaultGradientColors?.length - 1,
    );

    const profile = user_data.user.profile;
    const user: UserState = {
      user: {
        user_data: {
          fullname: `${profile?.first_name} ${profile?.last_name}`,
          avatar: user_data?.user?.avatar,
          color: defaultGradientColors[randomColor] || defaultGradientColors[0],
          email_address: profile?.email,
          first_name: profile?.first_name,
          last_name: profile?.last_name,
          birthdate: '',
          phone: profile.cell_phone,
          gender: profile.gender,
          program: user_data.user.programs[0],
        },
        lives: lives?.attempts,
        timestamp: new Date().getTime(),
        token: user_data.token,
        _id: user_data?.user?.id || user_data?.user?._id,
        alliance_id: alliance_id,
      },
    };
    await props.dispatch(loginAction(user));

    const params = {
      nPerPage: '10',
      not_validate_alliance: false,
      not_validate_structure: false,
      not_validate_user: false,
      pageNumber: '1',
      structure_id: user_data.user.programs[0]?._id || '',
    };

    await profileService.getStatistics(
      user_data.token,
      alliance_id,
      props.dispatch,
      params,
    );
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
      const IqSecundariaAlliance = data?.alliances?.find(
        (item: any) => item?.name === 'IQ Secundaria',
      );
      return IqSecundariaAlliance?._id;
    } else {
      if(data?.message && !data?.message.includes('JSON')) Alert.alert('Error!', data.message);
    }
  };

  userStatus = async () => {
    const storeObject = store
    const auth = storeObject.getState()?.auth?.user?.token ? true : false
    const token = storeObject.getState().auth.user?.token || ''
    const alliance = store.getState().auth.user?.alliance_id || ''
    const user =  store.getState().auth.user?._id || ""

    if(auth){
      const queryData: HttpCustomStructure = {
        method: 'POST',
        url: `/api/user-status/${alliance}/update`,
        headers: new Headers({
          'Authorization': token
        }),
        params: {
          connection: "online",
          system: "app",
          user : user,
        },
        auth_token: token
      }
      await Http.send(queryData)
    }
  }

  logout = (dispatch: any) => dispatch(logoutAction());
  updateToken = (token: string, dispatch: any) => dispatch(updateToken(token));
}

export default AuthService;
