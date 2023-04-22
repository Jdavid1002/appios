import React, {Component} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import mainStyles from '../../../../styles/MainStyles';
import styles from '../styles/LoginFormStyle';
import {CustomText} from '../../../commons/customs/components/customComponents';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

class LoginFormComponent extends Component<any> {
  state = {
    showLettersPassword: false,
  };

  render() {
    const {email, password} = this.props;

    return (
      <View style={[styles.container]}>
        <CustomText style={mainStyles.label}>Correo electrónico</CustomText>
        <TextInput
          style={mainStyles.input}
          placeholder="Escribe tu Correo electrónico"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onChangeText={this.props.handleInputChange('email')}
          value={email}
          autoCapitalize="none"
          textContentType="emailAddress"
          autoComplete="email"
          keyboardType="email-address"
          editable={!this.props.loading}
        />

        <View style={{position: 'relative'}}>
          <CustomText style={mainStyles.label}>Contraseña</CustomText>
          <TextInput
            style={mainStyles.input}
            placeholder="Escribe tu contraseña"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            textContentType="password"
            autoCapitalize="none"
            secureTextEntry={!this.state.showLettersPassword}
            onChangeText={this.props.handleInputChange('password')}
            value={password}
            editable={!this.props.loading}
          />
          <CustomText
            style={{position: 'absolute', bottom: 32, right: 10}}
            onPress={() => {
              this.setState({
                showLettersPassword: !this.state.showLettersPassword,
              });
            }}>
            {!this.state.showLettersPassword ? (
              <FontAwesomeIcon
                icon={faEye}
                size={20}
                color="rgba(255, 255, 255, 0.5)"
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                size={20}
                color="rgba(255, 255, 255, 0.5)"
              />
            )}
          </CustomText>
        </View>

        <CustomText style={[mainStyles.textCenter, styles.textWhite]}>
          ¿Olvidaste tu contraseña?
        </CustomText>
        <CustomText
          style={[mainStyles.textCenter, mainStyles.link]}
          onPress={this.props.onForgotPassword}>
          Recupérala
        </CustomText>

        <TouchableOpacity
          onPress={this.props.onSubmit}
          style={mainStyles.formButton}
          disabled={this.props.loading}>
          {this.props.loading && <ActivityIndicator />}
          {!this.props.loading && (
            <CustomText
              style={[mainStyles.textCenter, mainStyles.formButtonText]}>
              Ingresar
            </CustomText>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginFormComponent;
