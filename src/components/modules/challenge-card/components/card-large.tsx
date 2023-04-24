import React from 'react';
import {View, Image} from 'react-native';
import styles from '../styles/styles-card-large';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import {TouchableOpacity} from 'react-native-gesture-handler';

function CardLarge(props: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={props.onPress}>
        <Image source={{uri: props.background}} style={styles.image} />
        <CustomText style={[styles.text, {color: '#061946'}]}>
          {props.name}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}

export default CardLarge;
