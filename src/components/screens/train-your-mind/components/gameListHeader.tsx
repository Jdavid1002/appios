import React from 'react';
import {Image, Text, View} from 'react-native';

import {styles} from '../../../../components/screens/train-your-mind';

const GameListHeader = () => {
  return (
    <View style={[styles.gameListHeader]}>
      <Image
        resizeMode="contain"
        source={require('assets/img/games/header_games.png')}
      />
      <View style={[styles.titleContainer]}>
        <Text style={[styles.text, styles.title]}>Juegos</Text>
      </View>
    </View>
  );
};

export default GameListHeader;
