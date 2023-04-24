import React from 'react';

import TrainYourMindCard from '../../../../components/screens/train-your-mind/components/tym-card';

import {gameList} from '../../../../components/screens/train-your-mind';

class TrainYourMindHome extends React.Component<any, any> {
  render() {
    return <TrainYourMindCard gameList={gameList} />;
  }
}

export default TrainYourMindHome;
