import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from '../../../screens/login/containers/login';
// import ForgotPasswordScreen from '../../../screens/forgot-password/containers/forgot-password';
// import RegisterFormScreenComponent from '../../../screens/register/containers/register';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function mapStateToProps(state: any) {
  return state;
}

class AuthenticationLayout extends Component<any, any> {
  render() {
    const Tab = createBottomTabNavigator();
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Iniciar sesión',
              headerShown: false,
            }}
          />
          {/* <Tab.Screen
            name="Register"
            component={RegisterFormScreenComponent}
            options={{
              title: 'Registrarse',
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
              title: 'Olvidó su contraseña',
              headerShown: false,
            }}
          /> */}
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps)(AuthenticationLayout);
