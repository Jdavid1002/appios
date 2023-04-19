import React, {Component} from 'react';
import {View, Alert, StatusBar, Platform, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import RegisterForm1 from '../components/register-form-1/components/register-form-1';
import RegisterForm2 from '../components/register-form-2/components/register-form-2';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {CustomText} from 'app_components/commons/customs/components/customComponents';

import {connect} from 'react-redux';
import {Http, HttpCustomStructure} from 'app_utils/http';
import AuthService from 'app_services/auth/auth';
import mainStyles from 'app_styles/MainStyles';

class RegisterFormScreenComponent extends Component<any> {
  state = {
    facebook_id: '',
    email_validated: '',
    name: '',
    last_name: '',
    email: '',
    password: '',
    confPassword: '',
    userType: '',
    center: {},
    grade: '',
    journey : '',
    birthDate: '',
    tel: '',
    gender: '',
    subjects: [{}],
    step: 1,
    loading: false,
  };


  userTypes = [
    { value: '62cef6fa8facba0f2df89871', label: 'Estudiante', key: 'estudiante' },
    { value: '63054a871e65131020dc7905', label: 'Docente', key: 'docente' },
    { value: '63054affee06d1100a3f0649', label: 'Invitado', key: 'invitado' },
  ]


  grades = [
    { key: '63054a021e65131020dc6da7', label: '1° de secundaria' },
    { key: '63054a4c1e65131020dc74b4', label: '2° de secundaria' },
    { key: '63054a871e65131020dc7906', label: '3° de secundaria' },
    { key: '63054b1fee06d1100a3f0820', label: '4° de secundaria' },
    { key: '63054b3cee06d1100a3f0a2b', label: '5° de secundaria' },
    { key: '63054b741e65131020dc8ab9', label: '6° de secundaria' },
  ]

  journeyOptions = [
    { key: 'morning', label: 'Matutina' },
    { key: 'evening', label: 'Vespertina' },
    { key: 'nocturne', label: 'Nocturna' },
    { key: 'sunday', label: 'Dominical' },
    { key: 'extended', label: 'Extendida' },
    { key: 'regular', label: 'Regular' },
  ]

  genders = [
    {key: 'male', label: 'Masculino'},
    {key: 'female', label: 'Femenino'},
  ];

  constructor(props: any) {
    super(props);

    this.state = {
      facebook_id:
        this.props.route.params && this.props.route.params.facebook_id
          ? this.props.route.params.facebook_id
          : '',
      email_validated:
        this.props.route.params && this.props.route.params.email_validated
          ? this.props.route.params.email_validated
          : '',
      name: '',
      last_name: '',
      email:
        this.props.route.params && this.props.route.params.email
          ? this.props.route.params.email
          : '',
      password: '',
      confPassword: '',
      userType: this.userTypes[0].key,
      center: {},
      grade: this.grades[0].key,
      journey: this.journeyOptions[0].key,
      birthDate: '',
      tel: '',
      gender: this.genders[0].key,
      subjects: [
        {key: '101', label: 'Lengua Española', selected: false},
        {key: '102', label: 'Matemáticas', selected: false},
        {key: '103', label: 'Ciencias Sociales', selected: false},
        {key: '104', label: 'Ciencias Naturales', selected: false},
      ],
      step: 1,
      loading: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectInputChange = this.handleSelectInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmitStep1 = this.handleSubmitStep1.bind(this);
    this.handleSubmitStep2 = this.handleSubmitStep2.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.handleIosInputChange = this.handleIosInputChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  handleSubmitStep1() {
    const {name, email, password, confPassword} = this.state;

    if (name === '' || email === '' || password === '' || confPassword === '') {
      Alert.alert('Error!', 'Llene todos los campos antes de continuar');
      return;
    }

    if (password !== confPassword) {
      Alert.alert('Error!', 'Las contraseñas no coinciden');
      return;
    }

    this.setState({step: 2});
  }

  async handleSubmitStep2() {
    const {
      name,
      email,
      password,
      confPassword,
      userType,
      birthDate,
      grade,
      gender,
      subjects,
      center,
    }: any = this.state;
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confPassword === '' ||
      userType === '' ||
      birthDate === '' ||
      gender === ''
    ) {
      Alert.alert('Error!', 'Llene todos los campos antes de continuar');
      return;
    }

    this.setState({loading: true});

    let subjects_array = [];

    if (userType === 'docente') {
      if (center === {}) {
        Alert.alert('Error!', 'Llene todos los campos antes de continuar');
      }
    } else if (userType === 'estudiante') {
      if (grade === '' || center === {}) {
        Alert.alert('Error!', 'Llene todos los campos antes de continuar');
      }
    } else if (userType === 'pendiente') {
      for (var i = subjects.length - 1; i >= 0; i--) {
        if (subjects[i].selected === true) {
          subjects_array.push(subjects[i].key);
        }
      }

      if (subjects_array.length === 0) {
        Alert.alert('Error!', 'Llene todos los campos antes de continuar');
      }
    }
    await this.loginAction({...this.state, subjects: subjects_array});
    this.setState({loading: false});
  }

  formatDate(d: any) {
    var month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  transformKeyThatValue = (item : any) => {
    return {
      value : item?.key,
      label : item?.label
    }
  }

  loginAction = async (register_data: any = {}) => {
    const authService = new AuthService();

    const alliance_id = await authService.getIqSecundariaID()

    const register_codes =  this.state.userType === 'estudiante' ?
      register_data?.grade :
      this.userTypes.find((item : any) => item.key === this.state.userType)?.value

    const newParams: any = {
      alliance_id: alliance_id,
      password: register_data.password,
      confirm_password: register_data.password,
      grade: this.transformKeyThatValue(this.grades?.find((item : any) => item?.key === register_data?.grade) || this.grades[0]),
      username: register_data.email,
      register_codes: register_codes,
      profile: {
        first_name: register_data?.name,
        last_name: register_data?.last_name,
        email: register_data?.email,
        confirm_email: register_data?.email,
        cell_phone: register_data?.tel,
        headquarter: register_data?.center?._id,
        birthday: this.formatDate(register_data?.birthDate),
        culture: 'es_DO',
        journey : register_data?.journey
      },
    };

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: '/api/auth/external/create-and-login',
      params: newParams,
    };

    const data = await Http.send(query_data);
    if (data.status === 'success') {
      const credentials = {
        username: newParams?.username,
        password: newParams?.password,
        alliance_id: alliance_id,
      }
      await authService.login(credentials, this.props);
    } else {
      Alert.alert('Error!', data.message);
    }
  };

  previousStep() {
    if (this.state.step === 1) {
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        step: this.state.step - 1,
      });
    }
  }

  handleInputChange(name: string) {
    return (text: string) => {
      this.setState({[name]: text});
    };
  }

  handleIosInputChange(name: string, value: string) {
    this.setState({[name]: value});
  }

  handleCenterChange = (name: string = '', value: object = {}) => {
    this.setState({[name]: value});
  };

  handleSelectInputChange(name: any) {
    return (itemValue: any, _: any) => {
      this.setState({[name]: itemValue});
    };
  }

  handleDateChange(birthDate: any) {
    this.setState({birthDate});
  }

  handleCheckBoxChange(subjectKey: any) {
    return () => {
      const newSubjects = [...this.state.subjects];

      newSubjects.forEach((subj: any) => {
        if (subj.key === subjectKey) {
          subj.selected = !subj.selected;
        }
      });

      this.setState({
        subjects: newSubjects,
      });
    };
  }

  render() {
    const {
      name,
      last_name,
      email,
      password,
      confPassword,
      userType,
      center,
      grade,
      journey,
      birthDate,
      tel,
      gender,
      step,
      subjects,
    } = this.state;

    return (
      <View>
        {Platform.OS === 'ios' && (
          <StatusBar barStyle="light-content" translucent={true} />
        )}

        <View style={styles.steps}>
          <View style={{width: 30}}>
            <TouchableOpacity onPress={this.previousStep}>
              <FontAwesomeIcon
                  icon={faChevronLeft}
                  color={'#E94044'}
                  size={26}
                />
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            <CustomText style={[mainStyles.textCenter, styles.stepsText]}>
              Paso {step} de 2
            </CustomText>
          </View>
        </View>

        {step === 1 ? (
          <RegisterForm1
            name={name}
            last_name={last_name}
            email={email}
            password={password}
            confPassword={confPassword}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmitStep1}
          />
        ) : (
          <RegisterForm2
            userType={userType}
            center={center}
            grade={grade}
            journey={journey}
            birthDate={birthDate}
            tel={tel}
            gender={gender}
            userTypes={this.userTypes}
            grades={this.grades}
            journeyOptions={this.journeyOptions}
            genders={this.genders}
            subjects={subjects}
            handleInputChange={this.handleInputChange}
            handleSelectInputChange={this.handleSelectInputChange}
            handleDateChange={this.handleDateChange}
            handleIosInputChange={this.handleIosInputChange}
            handleCheckBoxChange={this.handleCheckBoxChange}
            handleSubmit={this.handleSubmitStep2}
            handleCenterChange={this.handleCenterChange}
            loading={this.state.loading}
          />
        )}
      </View>
    );
  }
}

export default connect(null)(RegisterFormScreenComponent);
