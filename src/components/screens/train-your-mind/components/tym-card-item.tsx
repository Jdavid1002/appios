import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {TYMCardStyles} from 'app_components/screens/train-your-mind';
import {CustomText} from 'app_components/commons/customs/components/customComponents';

interface TymCardItemProps {
  data: any;
}

const TymCardItem: React.FC<TymCardItemProps> = props => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      style={{flex: 1}}
      onPress={() =>
        navigation.navigate('Train-your-mind/instructions', {
          headerTitle: props.data.name,
          data: props.data,
        })
      }>
      <View style={[TYMCardStyles.item]}>
        <View style={TYMCardStyles.brainContainer}>
          <Image
            style={TYMCardStyles.brainImage}
            source={require('assets/img/brain_white_md.png')}
          />
          {/* <CustomText style={TYMCardStyles.brainTextInfo}>
            {' '}
            +{props.data.points}{' '}
          </CustomText> */}
        </View>
        <Image
          resizeMode="contain"
          resizeMethod="scale"
          style={[
            TYMCardStyles.tymCardItemImage,
            props.data.key === 'spellIt' && {width: 80, maxWidth: '100%'},
          ]}
          source={props.data.home_image}
        />
        <CustomText style={[TYMCardStyles.tymCardItemText]}>
          {props.data.name}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(TymCardItem);
