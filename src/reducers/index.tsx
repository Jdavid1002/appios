import {combineReducers} from 'redux';

import {authReducer} from './auth/reducers';
import {profileReducer} from './profile/reducers';
import {statisticsReducer} from './statistics/reducers';
import {rankingsReducer} from './rankings/reducers';
import {simulacrumReducer} from './simulacrum/reducers';
import {triviaReducer} from './trivia/reducers';
import {dailyQuestionReducer} from './daily-question/reducers';
import {howIFeelReducer} from './how_i_feel/reducers';
import {notAuthInfo} from './not_auth_Info/reducers';
import {LOGOUT} from './auth/types';

const reducers = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  statistics: statisticsReducer,
  rankings: rankingsReducer,
  simulacrum: simulacrumReducer,
  trivia: triviaReducer,
  dailyQuestion: dailyQuestionReducer,
  howIFeel: howIFeelReducer,
  notAuthInfo : notAuthInfo
});

const rootReducer = (state: any, action: any) => {
  if (action.type === LOGOUT) {
    state = {
      notAuthInfo :  state.notAuthInfo
    };
  }
  return reducers(state, action);
};

export default rootReducer;
