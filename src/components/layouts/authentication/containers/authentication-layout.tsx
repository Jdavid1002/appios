import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import {Stack} from 'app_router/navigator';
import LoginScreen from 'app_components/screens/login/containers/login';
import ForgotPasswordScreen from 'app_components/screens/forgot-password/containers/forgot-password';
import RegisterScreen from 'app_components/screens/register/containers/register';

function mapStateToProps(state: any) {
  return state;
}

class AuthenticationLayout extends Component<any, any> {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Iniciar sesión',
              animationTypeForReplace: !this.props.auth.user ? 'pop' : 'push',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
              title: 'Olvidó su contraseña',
              // animationTypeForReplace: !this.props.auth.user ? 'pop' : 'push',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: 'Registrarse',
              // animationTypeForReplace: !this.props.auth.user ? 'pop' : 'push',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps)(AuthenticationLayout);
