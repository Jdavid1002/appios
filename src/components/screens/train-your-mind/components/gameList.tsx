import React from 'react';
import {FlatList, View} from 'react-native';
import {Text} from 'native-base';

import {
  GameType,
  GameListItem,
  GameListHeader,
  styles,
} from 'app_components/screens/train-your-mind';

interface GameListProps {
  data: GameType[];
}

const GameList: React.FC<GameListProps> = props => {
  return (
    <FlatList
      style={[styles.gameList]}
      contentContainerStyle={[styles.gameListContainer]}
      ListHeaderComponent={GameListHeader}
      data={props.data}
      renderItem={({item}) => <GameListItem key={item.key} data={item} />}
      numColumns={2}
      horizontal={false}
    />
  );
};

export default React.memo(GameList);
