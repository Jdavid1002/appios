import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import ForgotPasswordFormComponent from '../components/layout';
import {Http, HttpCustomStructure} from '../../../../utils/http';
class ForgotPasswordFormContainer extends Component {
  state = {email: '', showInputsOfCode : false, code : '',lastPassword : '', firstPassword : ''};

  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      showInputsOfCode : false,
      code : '',
      lastPassword : '',
      firstPassword : ''
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
    if(this.state.showInputsOfCode){
      if (this.state.firstPassword.length < 7 || this.state.lastPassword.length < 7) {
        alert('La contraseña debe tener al menos 8 caracteres');
        return;
      }
      if (this.state.firstPassword !== this.state.lastPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      this.updatePassword();
    }else{
      this.forgotPass();
    }
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

  updatePassword = async () => {
    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: '/api/auth/auth-by-token',
      headers: {
        'system-source': 'lms',
      },
      params: {
        source: 'email',
        token: this.state.code,
        password: this.state.firstPassword,
      },
    };

    const data = await Http.send(query_data);

    if(data?.code === 200) {
      Alert.alert(
        'Success',
        'La contraseña se actualizó correctamente',
        [{text: 'Cerrar'}],
      );
      this.props.navigation.navigate('Login');
    }else{
      Alert.alert(
        'Success',
        data?.message,
        [{text: 'Cerrar'}],
      );
    }
  }

  render() {
    const {email, showInputsOfCode, code, lastPassword, firstPassword} = this.state;
    return (
      <View style={{marginTop: 20}}>
        <ForgotPasswordFormComponent
          email={email}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.onSubmit}
          showInputsOfCode={showInputsOfCode}
          code={code}
          lastPassword={lastPassword}
          firstPassword={firstPassword}
        />
      </View>
    );
  }
}

export default ForgotPasswordFormContainer;
