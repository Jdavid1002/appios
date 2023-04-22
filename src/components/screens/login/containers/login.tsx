import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenSplash from '../../../commons/screen-splash/components/screen-splash';
import Layout from '../components/login-layout';

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
