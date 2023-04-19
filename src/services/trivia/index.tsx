import {Http, HttpCustomStructure} from 'app_utils/http';
import {Alert} from 'react-native';

import {get as getTriviaAction} from 'app_reducers/trivia/actions';

class TriviaService {
  getTrivia = async (token: string, dispatch: any) => {
    const query_data: HttpCustomStructure = {
      method: 'GET',
      url: '/api/trivia/day-trivia',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };

    const data = await Http.send(query_data);

    if (data.status === 'success') {
      dispatch(getTriviaAction(data));
    } else if (
      data.status === 'error' &&
      (data.status_code === 'trivia_not_found' ||
        data.status_code === 'trivia_not_available')
    ) {
      dispatch(getTriviaAction(data));
    } else {
      // Alert.alert('Error!', data.message);
    }
  };

  save = async (triviaData: any, token: string) => {
    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: '/api/trivia/save-trivia',
      params: triviaData,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };

    const data = await Http.send(query_data);

    if (data.status === 'success') {
      return data;
    } else {
      Alert.alert('Error!', data.message);
    }
  };
}

export default TriviaService;
