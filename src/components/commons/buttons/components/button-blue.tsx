import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import styles from '../styles/styles-button-blue';
import mainStyles from '../../../../styles/MainStyles';

function ButtonBlue(props: any) {
  const disabled = props.disabled ? props.disabled : false;
  const fontStyle = props.fontStyle ? props.fontStyle : {};
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.buttonSendWraper]}
      onPress={props.onPressBtn}>
      <View
        style={[
          styles.buttonSendContainer,
          disabled ? styles.buttonSendDisabled : styles.buttonSendEnabled,
          props.style,
        ]}>
        <CustomText
          style={[mainStyles.textCenter, styles.textbutton, fontStyle]}>
          {props.textBtn}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
}

export default ButtonBlue;
