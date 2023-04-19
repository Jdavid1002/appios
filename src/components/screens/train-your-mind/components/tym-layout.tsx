import React from 'react';
import {View} from 'react-native';
import HowIFeel from 'app_components/commons/how-i-feel';

import {
  GameList,
  GameType,
  styles,
} from 'app_components/screens/train-your-mind';

interface trainYourMindLayoutProps {
  gameList: GameType[];
}

const TrainYourMindLayout: React.FC<trainYourMindLayoutProps> = props => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.wrapper]}>
        <GameList data={props.gameList} />
      </View>
      <HowIFeel screen="section_train_your_mind" />
    </View>
  );
};

export default React.memo(TrainYourMindLayout);
