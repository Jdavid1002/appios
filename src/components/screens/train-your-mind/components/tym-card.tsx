import React from 'react';
import {View, FlatList} from 'react-native';

import {CustomText} from 'app_components/commons/customs/components/customComponents';

import {TYMCardStyles as styles} from 'app_components/screens/train-your-mind';

import {TYMCardItem} from 'app_components/screens/train-your-mind';

const TrainYourMindCard = (props: any) => {
  return (
    <View style={[styles.container, {marginHorizontal: -20, marginBottom: 20}]}>
      <CustomText style={[styles.textTitle, {marginHorizontal: 20}]}>
        Entrena tu mente
      </CustomText>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={props.gameList}
        contentContainerStyle={[{paddingHorizontal: 20}]}
        renderItem={({item}) => <TYMCardItem key={item.key} data={item} />}
      />
    </View>
  );
};
export default TrainYourMindCard;
