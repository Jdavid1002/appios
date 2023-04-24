import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import styles from '../styles/styles';

function DrawerMenuItem(props: any) {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={props.onPress}>
      <View>
        <CustomText style={styles.itemText}>{props.name}</CustomText>
      </View>
    </TouchableOpacity>
  );
}

export default DrawerMenuItem;
