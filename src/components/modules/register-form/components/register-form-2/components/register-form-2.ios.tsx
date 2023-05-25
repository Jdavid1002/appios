import React, {Component} from 'react';
import {
  ActionSheetIOS,
  TextInput,
  Modal,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'react-native-check-box';
import mainStyles from '../../../../../../styles/MainStyles';
import styles from '../styles/styles';
import CenterSearchBarContainer from '../../../../../modules/center-search-bar/containers/center-search-bar-container';
import {CustomText} from '../../../../../commons/customs/components/customComponents';

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
    this.showActionSheet = this.showActionSheet.bind(this);
  }

  onDateChange(_: any, selectedDate: any) {
    const currentDate = selectedDate || this.props.birthDate;

    this.setState({showPicker: true});

    this.props.handleDateChange(currentDate);
  }

  showDatePicker() {
    const current = this.state.showPicker;
    this.setState({showPicker: !current});
  }

  openModal = () => {
    this.setState({modalVisible: true});
  };

  closeModal = (item: any = {}, notFoundInfo ?: {
    headquarter_not_found_name : string
    location_not_found_name : string
  }) => {
    if(notFoundInfo){
      this.props.handleCenterChange('headquarter_not_found_name', notFoundInfo?.headquarter_not_found_name);
      this.props.handleCenterChange('location_not_found_name', notFoundInfo?.location_not_found_name);
    }
    
    this.setState({modalVisible: false});
    this.props.handleCenterChange('center', item);
  };

  showActionSheet(inputName: string, options: any) {
    this.setState({showPicker: false});
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
          this.props.handleIosInputChange(inputName, value[0].key);
        }
      },
    );
  }

  render() {
    const {
      userType,
      center,
      grade,
      birthDate,
      tel,
      gender,
      userTypes,
      grades,
      journeyOptions,
      genders,
      subjects,
      journey,
    } = this.props;
    const {showPicker} = this.state;
    const userSelected = userTypes.filter(function (_data: any) {
      return _data.key === userType;
    });
    const genderSelected = genders.filter(function (_data: any) {
      return _data.key === gender;
    });
    const gradeSelected = grades.filter(function (_data: any) {
      return _data.key === grade;
    });

    const journeySelected = journeyOptions.filter(function (_data: any) {
      return _data.key === journey;
    });

    return (
      <View style={mainStyles.formContainer}>
        <View style={styles.inputsContainer}>
          <CustomText style={mainStyles.label}>Tipo de usuario</CustomText>
          <TouchableOpacity
            style={mainStyles.input}
            onPress={_ => this.showActionSheet('userType', userTypes)}>
            <CustomText style={styles.inputText}>
              {userSelected[0].label}
            </CustomText>
          </TouchableOpacity>

          {userType === 'estudiante' && (
            <>
              <CustomText style={mainStyles.label}>Grado escolar</CustomText>
              <TouchableOpacity
                style={mainStyles.input}
                onPress={_ => this.showActionSheet('grade', grades)}>
                <CustomText style={styles.inputText}>
                  {' '}
                  {gradeSelected[0].label}{' '}
                </CustomText>
              </TouchableOpacity>
            </>
          )}

          {userType === 'estudiante' && (
            <>
              <CustomText style={mainStyles.label}>Jornada </CustomText>
              <TouchableOpacity
                style={mainStyles.input}
                onPress={_ => this.showActionSheet('journey', journeyOptions)}>
                <CustomText style={styles.inputText}>
                  {' '}
                  {journeySelected[0].label}{' '}
                </CustomText>
              </TouchableOpacity>
            </>
          )}

          {(userType === 'estudiante' || userType === 'docente') && (
            <>
              <CustomText style={mainStyles.label}>Centro educativo</CustomText>

              <TouchableOpacity
                onPress={this.openModal}
                style={mainStyles.input}>
                <CustomText style={styles.inputText}>
                  {center.school_name}
                </CustomText>
              </TouchableOpacity>

              <Modal visible={this.state.modalVisible} animationType={'slide'}>
                <View
                  style={[
                    mainStyles.blueBackground,
                    mainStyles.mainContainer,
                    mainStyles.formContainer,
                  ]}>
                  <CenterSearchBarContainer
                    onSubmit={this.closeModal}
                    userType={userType}
                  />
                </View>
              </Modal>
            </>
          )}

          <CustomText style={mainStyles.label}>Teléfono (opcional)</CustomText>
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

          <CustomText style={mainStyles.label}>Género</CustomText>
          <TouchableOpacity
            style={mainStyles.input}
            onPress={_ => this.showActionSheet('gender', genders)}>
            <CustomText style={styles.inputText}>
              {genderSelected[0].label}
            </CustomText>
          </TouchableOpacity>

          <CustomText style={mainStyles.label}>Fecha de nacimiento</CustomText>
          <TouchableOpacity
            style={mainStyles.input}
            onPress={this.showDatePicker}>
            <CustomText style={styles.inputText}>
              {birthDate
                ? `${birthDate.getDate()}/${
                    birthDate.getMonth() + 1
                  }/${birthDate.getFullYear()}`
                : 'día/mes/año'}
            </CustomText>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              mode={'date'}
              display="default"
              value={birthDate || new Date()}
              onChange={this.onDateChange}
              style={styles.datePicker}
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
