import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import mainStyles from 'app_styles/MainStyles';
import styles from '../styles/styles';
import {CustomText} from 'app_components/commons/customs/components/customComponents';

class RegisterForm1Component extends Component<any> {
  render() {
    const {name, last_name, email, password, confPassword} = this.props;

    return (
      <View style={mainStyles.formContainer}>
        <View style={styles.inputsContainer}>
          <CustomText style={mainStyles.label}>Nombres</CustomText>
          <TextInput
            onChangeText={this.props.handleInputChange('name')}
            value={name}
            placeholder="Nombres"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={[mainStyles.input, styles.input]}
            autoCompleteType="name"
          />
          <CustomText style={mainStyles.label}>Apellidos</CustomText>
          <TextInput
            onChangeText={this.props.handleInputChange('last_name')}
            value={last_name}
            placeholder="Apellidos"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={[mainStyles.input, styles.input]}
          />

          <CustomText style={mainStyles.label}>
            Correo electrónico / Usuario
          </CustomText>
          <TextInput
            style={[mainStyles.input, styles.input, {marginBottom: 8}]}
            onChangeText={this.props.handleInputChange('email')}
            placeholder="E-mail"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            autoCapitalize="none"
            value={email}
            textContentType="emailAddress"
            autoCompleteType="email"
            keyboardType="email-address"
          />
          <CustomText style={mainStyles.inputDescription}>
            El correo electrónico que utilices será tu usuario dentro de la
            APP.
          </CustomText>

          <CustomText style={mainStyles.label}>Contraseña</CustomText>
          <TextInput
            style={[mainStyles.input, styles.input]}
            onChangeText={this.props.handleInputChange('password')}
            placeholder="Contraseña"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={password}
            textContentType="password"
            autoCompleteType="password"
            secureTextEntry={true}
          />

          <CustomText style={mainStyles.label}>Confirmar contraseña</CustomText>
          <TextInput
            style={[mainStyles.input, styles.input]}
            onChangeText={this.props.handleInputChange('confPassword')}
            placeholder="Contraseña"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={confPassword}
            textContentType="password"
            autoCompleteType="password"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          style={mainStyles.formButton}
          onPress={this.props.handleSubmit}>
          <CustomText
            style={[mainStyles.textCenter, mainStyles.formButtonText]}>
            Siguiente
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RegisterForm1Component;
