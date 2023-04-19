import React, {Component} from 'react';
import {ScrollView, SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
import RegisterFormContainer from '../../../modules/register-form/containers/register-form';
import mainStyles from 'app_styles/MainStyles';
import LogoHeaderContainer from 'app_components/commons/logo-header/containers/logo-header-container';

class RegisterFormScreenComponent extends Component <any> {
  render() {
    return (
      <KeyboardAvoidingView
        style={[mainStyles.blueBackground, mainStyles.mainContainer, { flex: 1 }]}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
      >
        <SafeAreaView>
          <ScrollView>
            <LogoHeaderContainer
              //navigation={this.props.navigation}
            />
            <RegisterFormContainer {...this.props} />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

export default RegisterFormScreenComponent;
