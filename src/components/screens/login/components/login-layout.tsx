import React from 'react';
import {ScrollView, View, StatusBar} from 'react-native';

import LogoHeaderContainer from '../../../commons/logo-header/containers/logo-header-container';
import LoginFormContainer from '../../../modules/login-form/containers/login-form';
import {CustomText} from '../../../commons/customs/components/customComponents';
import mainStyles from '../../../../styles/MainStyles';
import styles from '../styles/login-styles';

function LoginLayout(props: any) {
  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <View style={[mainStyles.blueBackground, styles.formContainer]}>
        <LogoHeaderContainer />
        <LoginFormContainer
          onSubmit={props.onSubmit}
          onForgotPassword={props.onForgotPassword}
        />
      </View>

      <CustomText
        style={[
          mainStyles.textCenter,
          styles.textBlue,
          mainStyles.marginTop20,
        ]}>
        ¿No tienes una cuenta?
      </CustomText>
      <CustomText
        style={[mainStyles.textCenter, mainStyles.link]}
        onPress={props.onRegister}>
        Regístrate
      </CustomText>
    </ScrollView>
  );
}

export default LoginLayout;
