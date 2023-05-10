import React, {Component} from 'react';
import {
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'react-native-check-box';
import mainStyles from '../../../../../../styles/MainStyles';
import styles from '../styles/styles';
import CenterSearchBarContainer from '../../../../../../components/modules/center-search-bar/containers/center-search-bar-container';
import {CustomText} from '../../../../../../components/commons/customs/components/customComponents';

class RegisterForm2Component extends Component<any> {
  state = {
    showPicker: false,
    modalVisible: false,
  };

  constructor(props: any) {
    super(props);

    this.state = {
      showPicker: false,
      modalVisible: false,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
  }

  onDateChange(_: any, selectedDate: any) {
    const currentDate = selectedDate || this.props.birthDate;

    this.setState({showPicker: false});

    this.props.handleDateChange(currentDate);
  }

  openModal = () => {
    this.setState({modalVisible: true});
  };

  closeModal = (item: any = {}) => {
    this.setState({modalVisible: false});
    this.props.handleCenterChange('center', item);
  };

  showDatePicker() {
    this.setState({showPicker: true});
  }

  render() {
    const {
      userType,
      center,
      grade,
      journey,
      birthDate,
      tel,
      gender,
      userTypes,
      grades,
      genders,
      subjects,
      journeyOptions,
    } = this.props;
    const {showPicker} = this.state;

    return (
      <View style={mainStyles.formContainer}>
        <View style={styles.inputsContainer}>
          <CustomText style={mainStyles.label}>Tipo de usuario</CustomText>

          <View style={styles.input}>
            <Picker
              mode={'dialog'}
              style={styles.picker2}
              selectedValue={userType}
              onValueChange={this.props.handleSelectInputChange('userType')}>
              {userTypes.map((type: any) => (
                <Picker.Item
                  key={type.key}
                  label={type.label}
                  value={type.key}
                />
              ))}
            </Picker>
          </View>

          {userType === 'estudiante' && (
            <>
              <CustomText style={mainStyles.label}>Grado escolar</CustomText>

              <View style={styles.input}>
                <Picker
                  mode={'dialog'}
                  style={styles.picker}
                  selectedValue={grade}
                  itemStyle={styles.inputText}
                  onValueChange={this.props.handleSelectInputChange('grade')}>
                  {grades.map((g: any) => (
                    <Picker.Item key={g.key} label={g.label} value={g.key} />
                  ))}
                </Picker>
              </View>
            </>
          )}

          {userType === 'estudiante' && (
            <>
              <CustomText style={mainStyles.label}> Jornada </CustomText>

              <View style={styles.input}>
                <Picker
                  mode={'dialog'}
                  style={styles.picker}
                  selectedValue={journey}
                  onValueChange={this.props.handleSelectInputChange('journey')}>
                  {journeyOptions.map((g: any) => (
                    <Picker.Item key={g.key} label={g.label} value={g.key} />
                  ))}
                </Picker>
              </View>
            </>
          )}

          {(userType === 'estudiante' || userType === 'docente') && (
            <>
              <CustomText style={mainStyles.label}>Centro educativo</CustomText>

              <TouchableOpacity onPress={this.openModal}>
                <CustomText style={[mainStyles.input, {flex: 1}]}>
                  {center.school_name}
                </CustomText>
              </TouchableOpacity>

              <Modal visible={this.state.modalVisible} animationType={'slide'}>
                <View
                  style={[mainStyles.blueBackground, mainStyles.mainContainer]}>
                  <CenterSearchBarContainer
                    onSubmit={this.closeModal}
                    userType={userType}
                  />
                </View>
              </Modal>
            </>
          )}

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, paddingRight: 10}}>
              <CustomText style={mainStyles.label}>
                Teléfono (opcional)
              </CustomText>
              <TextInput
                style={[mainStyles.input, {flex: 1}]}
                placeholder="Celular"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={tel}
                onChangeText={this.props.handleInputChange('tel')}
                textContentType="telephoneNumber"
                keyboardType="number-pad"
                autoCompleteType="tel"
              />
            </View>

            <View style={{flex: 1, paddingLeft: 10}}>
              <CustomText style={mainStyles.label}>Género</CustomText>

              <View style={styles.input}>
                <Picker
                  mode={'dialog'}
                  selectedValue={gender}
                  style={styles.picker}
                  onValueChange={this.props.handleSelectInputChange('gender')}>
                  {genders.map((gen: any) => (
                    <Picker.Item
                      key={gen.key}
                      label={gen.label}
                      value={gen.key}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <CustomText style={mainStyles.label}>Fecha de nacimiento</CustomText>
          <CustomText style={mainStyles.input} onPress={this.showDatePicker}>
            {birthDate
              ? `${birthDate.getDate()}/${birthDate.getMonth() +
                  1}/${birthDate.getFullYear()}`
              : 'día/mes/año'}
          </CustomText>

          {showPicker && (
            <DateTimePicker
              mode={'date'}
              display="default"
              value={birthDate || new Date()}
              onChange={this.onDateChange}
            />
          )}

          {userType === 'pendiente' && (
            <>
              <CustomText style={mainStyles.label}>Asignaturas</CustomText>
              {subjects.map((subj: any) => (
                <CheckBox
                  key={subj.key}
                  style={styles.checkbox}
                  rightTextStyle={styles.checkboxText}
                  onClick={this.props.handleCheckBoxChange(subj.key)}
                  isChecked={subj.selected}
                  rightText={subj.label}
                  checkedCheckBoxColor={'#39B3E2'}
                  uncheckedCheckBoxColor={'#FFF'}
                />
              ))}
            </>
          )}
        </View>

        <TouchableOpacity
          style={mainStyles.formButton}
          onPress={this.props.handleSubmit}
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

export default RegisterForm2Component;
