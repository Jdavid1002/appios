import React, {Component} from 'react';
import Layout from 'app_components/screens/login/components/login-layout';
import {connect} from 'react-redux';
import ScreenSplash from 'app_components/commons/screen-splash/components/screen-splash';

class Login extends Component<any, any> {
  state = {
    loading: false,
  };

  handleRegister = () => {
    this.props.navigation.navigate('Register');
  };

  handleForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  render() {
    if (this.state.loading === true) {
      return <ScreenSplash />;
    }

    return (
      <Layout
        onRegister={this.handleRegister}
        onForgotPassword={this.handleForgotPassword}
      />
    );
  }
}

export default connect()(Login);
