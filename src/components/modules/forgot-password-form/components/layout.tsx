import React, {Component} from 'react';
import {
  Platform,
  StatusBar,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import mainStyles from '../../../../styles/MainStyles';
import styles from '../styles/styles';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';

class ForgotPasswordFormComponent extends Component<any> {
  render() {
    const {email} = this.props;

    return (
      <View style={mainStyles.formContainer}>
        {Platform.OS === 'ios' && (
          <StatusBar barStyle="light-content" translucent={true} />
        )}

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
      </View>
    );
  }
}

export default ForgotPasswordFormComponent;
