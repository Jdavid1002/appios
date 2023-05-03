import React, {Component} from 'react';
import {View} from 'react-native';
import ForgotPasswordFormComponent from '../components/layout';
import {Http, HttpCustomStructure} from '../../../../utils/http';

class ForgotPasswordFormContainer extends Component {
  state = {email: '', showInputsOfCode : false};

  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      showInputsOfCode : false
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
      url: '/api/auth/generate-authentication',
      headers: {
        'system-source': 'lms',
      },
      params: {
        email: this.state.email,
        destination: 'email',
        alliance: 'iq-secundaria',
      },
    };

    const data = await Http.send(query_data);
    if (data.status === 'success') {
      this.setState({...this.state, showInputsOfCode : true});
    } else {
      this.setState({...this.state, showInputsOfCode : false});
    }
  };

  render() {
    const {email, showInputsOfCode} = this.state;

    return (
      <View style={{marginTop: 20}}>
        <ForgotPasswordFormComponent
          email={email}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.onSubmit}
          showInputsOfCode={showInputsOfCode}
        />
      </View>
    );
  }
}

export default ForgotPasswordFormContainer;
