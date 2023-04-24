import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import styles from '../styles/styles-button-red';
import mainStyles from '../../../../styles/MainStyles';

function ButtonRed(props: any) {
  const disabled = props.disabled ? props.disabled : false;
  const fontStyle = props.fontStyle ? props.fontStyle : {};
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.buttonSendWraper, props.style]}
      onPress={props.onPressBtn}>
      <View
        style={[
          styles.buttonSendContainer,
          disabled ? styles.buttonSendDisabled : styles.buttonSendEnabled,
        ]}>
        <CustomText
          style={[mainStyles.textCenter, styles.textbutton, fontStyle]}>
          {props.textBtn}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
}

export default ButtonRed;
