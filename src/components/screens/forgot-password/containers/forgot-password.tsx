import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import ForgotPasswordFormContainer from '../../../modules/forgot-password-form/containers/forgot-password-form';
import mainStyles from '../../../../styles/MainStyles';
import LogoHeaderContainer from '../../../commons/logo-header/containers/logo-header-container';

class ForgotPassword extends Component {
  render() {
    return (
      <SafeAreaView
        style={[mainStyles.blueBackground, mainStyles.mainContainer]}>
        {/* <LogoHeaderContainer navigation={this.props.navigation}/> */}
        <ForgotPasswordFormContainer />
      </SafeAreaView>
    );
  }
}

export default ForgotPassword;
