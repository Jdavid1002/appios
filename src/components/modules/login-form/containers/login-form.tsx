import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {connect} from 'react-redux';

import Layout from 'app_components/modules/login-form/components/layout';
import AuthService from 'app_services/auth/auth';

class LoginFormContainer extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: null,
      password: null,
      loading: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleInputChange(name: string) {
    return (text: string) => {
      this.setState({[name]: text});
    };
  }

  submitForm() {
    this.loginAction();
  }

  loginAction = async () => {
    const authService = new AuthService();
    const alliance_id = await authService.getIqSecundariaID()

    this.setState({...this.state, loading: true});

    if (this.state.email && this.state.password) {
      const credentials = {
        username: this.state.email,
        password: this.state.password,
        alliance_id: alliance_id,
      };
      await authService.login(credentials, this?.props)
    } else {
      Alert.alert('Error', 'Ingrese los credenciales de acceso');
    }

    this.setState({...this.state, loading: false});
  };

  render() {
    const {email, password} = this.state;

    return (
      <View>
        <Layout
          email={email}
          password={password}
          handleInputChange={this.handleInputChange}
          onSubmit={this.submitForm}
          onForgotPassword={this.props.onForgotPassword}
          loading={this.state.loading}
        />
      </View>
    );
  }
}

export default connect(null)(LoginFormContainer);
