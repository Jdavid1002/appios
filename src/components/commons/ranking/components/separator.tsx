import React from 'react';
import {View, Text} from 'react-native';

import styles from './../styles';

interface SeparatorProps {
  color: string;
}

const Separator: React.FC<SeparatorProps> = props => {
  return (
    <View
      style={[styles.separator, {backgroundColor: props.color, opacity: 0.1}]}>
      <Text style={[styles.separatorDots, {color: props.color, opacity: 1}]}>
        •••
      </Text>
    </View>
  );
};

export default Separator;
