import React from 'react';
import {connect} from 'react-redux';
import LoginScreen from '../../../screens/login/containers/login';
import ForgotPasswordScreen from '../../../screens/forgot-password/containers/forgot-password';
import RegisterFormScreenComponent from '../../../screens/register/containers/register';
import {createStackNavigator} from '@react-navigation/stack';

function mapStateToProps(state: any) {
  return state;
}

const Stack = createStackNavigator();

const AuthenticationLayout = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Inicia sesion',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterFormScreenComponent}
        options={{
          title: 'Registrarse',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          title: 'Olvidó su contraseña',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default connect(mapStateToProps)(AuthenticationLayout);
