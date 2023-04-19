import {UpdateProfile} from 'app_reducers/profile/types';
import {update as updateStatisticsAction} from 'app_reducers/statistics/actions';

import ProblemsGameService from './problems';
import MemoryGameService from './memory';
import SpellItGameService from './spellIt';

import {Http, HttpCustomStructure} from 'app_utils/http';
import {Alert} from 'react-native';

class GameService {
  save = async (
    saveData: Partial<UpdateProfile>,
    statistics: any,
    token: string,
    dispatch: any,
  ) => {
    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: '/api/train-your-mind/save-game',
      params: saveData,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };

    const data = await Http.send(query_data);

    if (data.status === 'success') {
      statistics.points.total = statistics.points.total + data.brains_to_assign;
      dispatch(updateStatisticsAction(statistics));
    } else {
      Alert.alert('Error!', data.message);
    }

    return data;
  };

  problemsData = (level: number = 0) => {
    const problemsGameService = new ProblemsGameService();

    const question = problemsGameService.generate(level);

    return question;
  };

  memoryData = () => {
    const memoryGameService = new MemoryGameService();

    return memoryGameService.generate();
  };

  spellItData = () => {
    const spellItGameService = new SpellItGameService();

    return spellItGameService.generate();
  };
}

export default GameService;
