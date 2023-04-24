import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';

import {TipCardStyles as styles} from '../../../../components/modules/tips';

const tipsImg: any = {
  new: require('assets/img/tips/new.png'),
  video: require('assets/img/tips/video.png'),
};

function TipCard(props: any) {
  const {name, type} = props.content;

  let short_name = name;
  if (name.length > 34) {
    short_name = `${name.slice(0, 34)}...`;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={props.onPress}>
        <CustomText style={styles.text}>{short_name}</CustomText>
        {tipsImg.hasOwnProperty(type) && (
          <View style={styles.imageContainer}>
            <Image source={tipsImg[type]} style={styles.image} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default TipCard;
