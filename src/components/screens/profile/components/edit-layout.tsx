import React, {Component} from 'react';
import {
  Modal,
  View,
  ScrollView,
  TextInput,
  StatusBar,
  Platform,
  ActionSheetIOS,
  KeyboardAvoidingView,
  Text,
  TouchableHighlight,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import mainStyles from '../../../../styles/MainStyles';
import styles from './../styles';

class ProfileEditModal extends Component<any> {
  showActionSheet(inputName: string, options: any) {
    const opts = [...options.map((data: any) => data.label), 'Cancelar'];
    const cancelIndex = opts.length - 1;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: opts,
        cancelButtonIndex: cancelIndex,
      },
      buttonIndex => {
        if (buttonIndex !== cancelIndex) {
          let value = options.filter(
            (_optData: any) => _optData.label === opts[buttonIndex],
          );
          this.props.handleInputChange('sex', value[0].key);
          this.props.handleInputChange('gender', value[0].label);
        }
      },
    );
  }

  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        presentationStyle="overFullScreen"
        onRequestClose={() => this.props.setVisible(false)}>
        <KeyboardAvoidingView
          style={[styles.container]}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View
              style={{
                backgroundColor: '#061946',
                borderBottomColor : 'white', 
                borderBottomWidth : 2,
                width : '100%',
                flexDirection: 'row',
                alignItems : 'center',
                justifyContent : 'space-between',
                paddingHorizontal : 12,
                paddingBottom : 10,
                paddingTop : 55
              }}
            >
              <StatusBar
                translucent={true}
                backgroundColor="#061946"
                barStyle="light-content"
              />

              <View style={{width : '15%', justifyContent : 'center', alignItems : 'center'}}  >
                <TouchableHighlight onPress={() => this.props.setVisible(false)} >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    color={'#24ABDF'}
                    size={24}
                  />
                </TouchableHighlight>
              </View>

              <View style={{width : '70%'}} >
                <Text style={{color: 'white', textAlign : 'center'}}>Editar perfil</Text>
              </View>

              <View style={{width : '15%', justifyContent : 'center', alignItems : 'center'}}  >
                <TouchableHighlight
                  onPress={this.props.doEdit}
                  disabled={this.props.state.status === 'loading'}
                >
                  <View>
                    {this.props.state.status === 'loading' && (
                      <Text>
                        0
                      </Text>
                    )}
                    <Text style={{color: '#39b3e2'}}>Guardar</Text>
                  </View>
                </TouchableHighlight>
              </View>

            </View>

            <ScrollView
              contentContainerStyle={[styles.wrapper, {paddingTop: 16}]}>
              <View style={[styles.grid]}>
                <View style={[styles.row, {margin: 8}]}>
                  <Text style={[styles.label]}>Nombre</Text>
                  <TextInput
                    onChangeText={(text: string) =>
                      this.props.handleInputChange('first_name', text)
                    }
                    value={this.props.state.first_name}
                    placeholder="Nombre"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    style={[mainStyles.input, {marginBottom: 16}]}
                    autoCompleteType="name"
                  />
                </View>

                <View style={[styles.row, {margin: 8}]}>
                  <Text style={[styles.label]}>Apellido</Text>
                  <TextInput
                    onChangeText={(text: string) =>
                      this.props.handleInputChange('last_name', text)
                    }
                    value={this.props.state.last_name}
                    placeholder="Apellido"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    style={[mainStyles.input, {marginBottom: 16}]}
                    autoCompleteType="name"
                  />
                </View>

                <View style={[styles.row, {margin: 8}]}>
                  <Text style={[styles.label]}>Correo electrónico / Usuario</Text>
                  <TextInput
                    style={[mainStyles.input, {marginBottom: 16}]}
                    onChangeText={(text: string) =>
                      this.props.handleInputChange('email_address', text)
                    }
                    placeholder="E-mail"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    autoCapitalize="none"
                    value={this.props.state.email_address}
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    keyboardType="email-address"
                  />
                </View>

                {/* <View style={[styles.row, {margin: 8}]}>
                  <Text style={[styles.label]}>Fecha de nacimiento</Text>
                  <TouchableHighlight
                    onPress={() => this.props.setShowBirthdatePicker(true)}
                    style={[
                      mainStyles.input,
                      {marginBottom: 16, paddingHorizontal: 0},
                    ]}>
                    <Text>{this.props.state.birthdate}</Text>
                  </TouchableHighlight>
                  {this.props.state.showBirthdatePicker && (
                    <DateTimePicker
                      value={new Date(this.props.state.birthdate) || new Date()}
                      onChange={this.props.handleDateChange}
                      mode="date"
                      style={{backgroundColor: '#8E96AB', borderRadius: 30}}
                    />
                  )}
                </View> */}

                <View style={[styles.row, {margin: 8}]}>
                  <Text style={[styles.label]}>Teléfono (opcional *)</Text>
                  <TextInput
                    onChangeText={(text: string) =>
                      this.props.handleInputChange('phone', text)
                    }
                    value={this.props.state.phone}
                    placeholder="Teléfono"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    style={[mainStyles.input, {marginBottom: 16}]}
                    textContentType="telephoneNumber"
                    keyboardType="number-pad"
                    autoCompleteType="tel"
                  />
                </View>
              </View>
            </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

export default ProfileEditModal;
