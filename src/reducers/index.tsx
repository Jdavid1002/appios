import {combineReducers} from 'redux';

import {authReducer} from 'app_reducers/auth/reducers';
import {profileReducer} from 'app_reducers/profile/reducers';
import {statisticsReducer} from 'app_reducers/statistics/reducers';
import {rankingsReducer} from 'app_reducers/rankings/reducers';
import {simulacrumReducer} from 'app_reducers/simulacrum/reducers';
import {triviaReducer} from 'app_reducers/trivia/reducers';
import {dailyQuestionReducer} from 'app_reducers/daily-question/reducers';
import {howIFeelReducer} from 'app_reducers/how_i_feel/reducers';

import {LOGOUT} from 'app_reducers/auth/types';

const reducers = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  statistics: statisticsReducer,
  rankings: rankingsReducer,
  simulacrum: simulacrumReducer,
  trivia: triviaReducer,
  dailyQuestion: dailyQuestionReducer,
  howIFeel: howIFeelReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return reducers(state, action);
};

export default rootReducer;
