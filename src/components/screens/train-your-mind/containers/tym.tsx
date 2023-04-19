import React from 'react';

import {TrainYourMindLayout} from 'app_components/screens/train-your-mind';
// import {GameType} from 'app_components/screens/train-your-mind';
import {gameList} from 'app_components/screens/train-your-mind';

class TrainYourMind extends React.Component<any, any> {
  render() {
    return <TrainYourMindLayout gameList={gameList} />;
  }
}

export default TrainYourMind;
