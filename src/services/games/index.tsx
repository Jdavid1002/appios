import {UpdateProfile} from '../../reducers/profile/types';
import {update as updateStatisticsAction} from '../../reducers/statistics/actions';

import ProblemsGameService from './problems';
import MemoryGameService from './memory';
import SpellItGameService from './spellIt';

import {Http, HttpCustomStructure} from '../../utils/http';
import {Alert} from 'react-native';
import { store } from '../../storage/redux-storage';
import { User } from '../../reducers/auth/types';

class GameService {

  private alliance: any
  private storeObject: any
  private token: string
  private user: User

  constructor() {
    this.storeObject = store
    this.token = this.storeObject.getState().auth?.user?.token
    this.alliance = this.storeObject.getState().auth?.user?.alliance_id
    this.user = this.storeObject.getState().auth?.user
  }

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

  saveGameGamification = async (total_successes: number, statistics: any, dispatch: any) => {

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: `/api/gamification-user-statistics/${this.alliance}/games-gamification`,
      auth_token: this.token,
      params:{
        alliance_id: this.alliance,
        total_successes: total_successes,
        category: 'game',
        user_id: this.user._id
      }
    }

    const responseData = await Http.send(query_data)

    if(responseData.code === 200){
      statistics.total = Number(statistics.total) + Number(responseData.totalPoints);
      dispatch(updateStatisticsAction(statistics));
      return responseData
    }
  }
}

export default GameService;
