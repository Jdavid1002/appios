import React, {Component} from 'react';
import {
  ScrollView,
  SafeAreaView,
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
        style={[mainStyles.blueBackground, mainStyles.mainContainer, {flex: 1}]}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled>
        <SafeAreaView>
          <ScrollView>
            {/* <LogoHeaderContainer /> */}
            <RegisterFormContainer {...this.props} />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

export default RegisterFormScreenComponent;
