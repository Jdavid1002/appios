import React, {Component} from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import RegisterFormContainer from '../../../modules/register-form/containers/register-form';
import mainStyles from '../../../../styles/MainStyles';
import LogoHeaderContainer from '../../../commons/logo-header/containers/logo-header-container';

class RegisterFormScreenComponent extends Component<any> {
  render() {
    return (
      <KeyboardAvoidingView
        style={[
          mainStyles.blueBackground,
          mainStyles.mainContainer,
          {
            width: '100%',
            height: '100%',
          },
        ]}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <LogoHeaderContainer />
          <RegisterFormContainer {...this.props} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default RegisterFormScreenComponent;
