import React, {Component} from 'react';
import {
  Platform,
  StatusBar,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import mainStyles from '../../../../styles/MainStyles';
import styles from '../styles/styles';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';

class ForgotPasswordFormComponent extends Component<any> {
  render() {
    const {email, showInputsOfCode, code, lastPassword, firstPassword} = this.props;

    return (
      <ScrollView style={mainStyles.formContainer}>
        {Platform.OS === 'ios' && (
          <StatusBar barStyle="light-content" translucent={true} />
        )}

        {showInputsOfCode ? (
          <View> 
            <CustomText 
              style={{
                color: 'white',
                fontSize: 18,
                marginBottom: 22,
                textAlign: 'center',
              }} 
            >
              Te enviamos un correo electrónico para confirmar tu identidad, ingresa el código que enviamos a tu correo {email}
            </CustomText>
            <CustomText style={mainStyles.label}>Código</CustomText>
            <TextInput
              style={mainStyles.input}
              placeholder="Ej: 12345"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              autoCapitalize="none"
              textContentType={'telephoneNumber'}
              onChangeText={this.props.handleInputChange('code')}
              value={code}
            />
            <CustomText style={mainStyles.label}> Crea una nueva contraseña (mínimo 8 caracteres) </CustomText>
            <TextInput
              style={mainStyles.input}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              autoCapitalize="none"
              textContentType={'password'}
              onChangeText={this.props.handleInputChange('firstPassword')}
              value={firstPassword}
              secureTextEntry={true}
            />

            <CustomText style={mainStyles.label}> Confirma la nueva contraseña </CustomText>
            <TextInput
              style={mainStyles.input}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              autoCapitalize="none"
              textContentType={'password'}
              onChangeText={this.props.handleInputChange('lastPassword')}
              value={lastPassword}
              secureTextEntry={true}
            />
          </View>
          )
        : 
          <View>
            <CustomText style={mainStyles.label}>Correo electrónico</CustomText>
            <TextInput
              style={mainStyles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              autoCapitalize="none"
              textContentType={'emailAddress'}
              onChangeText={this.props.handleInputChange('email')}
              value={email}
            />
          </View>
        }

        <TouchableOpacity
          onPress={this.props.handleSubmit}
          style={[mainStyles.formButton, styles.button]}>
          <CustomText
            style={[
              mainStyles.textCenter,
              mainStyles.formButtonText,
              styles.buttonText,
            ]}>
            Restablecer
          </CustomText>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default ForgotPasswordFormComponent;
