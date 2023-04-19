import React from 'react';
import {Text} from 'react-native';
import dafaultStyles from '../styles/styles';

export const CustomText = (props: any) => {

  const {style, ...otherProps} = props;

  return (
    <Text style={[dafaultStyles.fonts, style]} {...otherProps}>
      {props.children}
    </Text>
  );
}
