import {Http, HttpCustomStructure} from 'app_utils/http';
import {Alert} from 'react-native';
import {setIsActive as setIsActiveAction} from 'app_reducers/how_i_feel/actions';

class HowIFeelService {
  save = async (hifData: any, token: string) => {
    
    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: '/api/log-how-you-feel/create',
      params: hifData,
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      }),
      auth_token: token
    };

    const data = await Http.send(query_data);

    if (data.status === 'success') {
      return data;
    } else {
      Alert.alert('Error!', data.message);
    }
  };

  setIsActive = (dispatch: any, is_active: boolean = false) => {
    dispatch(setIsActiveAction(is_active));
  };
}

export default HowIFeelService;
