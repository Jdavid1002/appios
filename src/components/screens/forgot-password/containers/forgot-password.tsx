import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import ForgotPasswordFormContainer from 'app_components/modules/forgot-password-form/containers/forgot-password-form';
import mainStyles from 'app_styles/MainStyles';
import LogoHeaderContainer from 'app_components/commons/logo-header/containers/logo-header-container';

class ForgotPassword extends Component {
  render() {
    return (
      <SafeAreaView
        style={[mainStyles.blueBackground, mainStyles.mainContainer]}>
        <LogoHeaderContainer navigation={this.props.navigation}/>
        <ForgotPasswordFormContainer />
      </SafeAreaView>
    );
  }
}

export default ForgotPassword;
