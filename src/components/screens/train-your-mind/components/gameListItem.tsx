import React from 'react';
import {View, Image, TouchableWithoutFeedback, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {GameType, styles} from '../../../../components/screens/train-your-mind';

interface GameListItemProps {
  data: GameType;
}

const GameListItem: React.FC<GameListItemProps> = props => {
  const navigation: any = useNavigation();
  return (
    <TouchableWithoutFeedback
      style={{flex: 1}}
      onPress={() =>
        navigation.navigate('Train-your-mind/instructions', {
          headerTitle: props.data.name,
          data: props.data,
        })
      }>
      <View style={[styles.gameListItem]}>
        <Image
          resizeMode="contain"
          resizeMethod="scale"
          style={[
            styles.gameListItemImage,
            props.data.key === 'spellIt' && {width: 160, maxWidth: '100%'},
          ]}
          source={props.data.image}
        />
        <Text
          style={[
            styles.text,
            styles.gameListItemTitle,
            {color: props.data.color},
          ]}>
          {props.data.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(GameListItem);
