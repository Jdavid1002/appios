import React from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';

import {
  ScrollView,
  View,
  // TouchableOpacity,
  StatusBar,
  // Platform,
} from 'react-native';
import LoginFormContainer from 'app_components/modules/login-form/containers/login-form';
import mainStyles from 'app_styles/MainStyles';
import styles from '../styles/login-styles';
import LogoHeaderContainer from 'app_components/commons/logo-header/containers/logo-header-container';
import {CustomText} from 'app_components/commons/customs/components/customComponents';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons';

function LoginLayout(props: any) {
  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <View style={[mainStyles.blueBackground, styles.formContainer]}>
        {/* <LogoHeaderContainer /> */}
        <LoginFormContainer
          onSubmit={props.onSubmit}
          onForgotPassword={props.onForgotPassword}
        />
      </View>

      {/* {Platform.OS === 'android' && (
        <TouchableOpacity
          onPress={props.onFacebook}
          style={styles.facebookButton}>
          <FontAwesomeIcon icon={faFacebookSquare} color={'#FFF'} size={28} />
          <CustomText style={styles.facebookButtonText}>
            Continuar con Facebook
          </CustomText>
        </TouchableOpacity>
      )} */}

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

      {/*<CustomText>Login - template</CustomText>
        <Button title="Iniciar sesión" onPress={props.onPress} />*/}
    </ScrollView>
  );
}

export default LoginLayout;
