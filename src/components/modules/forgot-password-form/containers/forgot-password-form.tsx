import React, {Component} from 'react';
import {View} from 'react-native';
import ForgotPasswordFormComponent from '../components/layout';
import {Http, HttpCustomStructure} from '../../../../utils/http';

class ForgotPasswordFormContainer extends Component {
  state = {email: ''};

  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(name: string) {
    return (text: string) => {
      this.setState({[name]: text});
    };
  }

  onSubmit() {
    if (this.state.email === '') {
      alert('Debes proporcionar un email válido');
      return;
    }
    this.forgotPass();
  }

  forgotPass = async () => {
    const query_data: HttpCustomStructure = {
      method: 'GET',
      url: '/api/auth/change-password',
      params: {
        email_address: this.state.email,
      },
    };
    const data = await Http.send(query_data);
    if (data.status === 'success') {
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  render() {
    const {email} = this.state;

    return (
      <View style={{marginTop: 20}}>
        <ForgotPasswordFormComponent
          email={email}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.onSubmit}
        />
      </View>
    );
  }
}

export default ForgotPasswordFormContainer;
