import React, {Component} from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';

import {UpdateProfile} from 'app_reducers/profile/types';
import ProfileService from 'app_services/profile';
import {ProfileEditLayout} from 'app_components/screens/profile';

class EditProfile extends Component<any, any> {
  constructor(props: any) {
    super(props);

    const genders = [
      {key: 'male', label: 'Masculino'},
      {key: 'female', label: 'Femenino'},
    ];

    this.state = {
      first_name: this?.props?.user_data?.first_name,
      last_name: this?.props?.user_data?.last_name,
      email_address: this?.props?.user_data?.email_address,
      birthdate: this?.props?.user_data?.birthdate,
      phone: this?.props?.user_data?.phone,
      sex: this?.props?.user_data?.sex,
      password: null,
      showBirthdatePicker: false,
      genders,
      status: null,
    };

    this.doEdit = this.doEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.setShowBirthdatePicker = this.setShowBirthdatePicker.bind(this);
  }

  setShowBirthdatePicker(value: boolean) {
    this.setState({showBirthdatePicker: value});
  }

  handleInputChange(name: string, value: string) {
    this.setState({[name]: value, showBirthdatePicker: false});
  }

  handleDateChange(_: any, selectedDate: Date | undefined) {
    try {
      const currentDate = selectedDate || new Date(this.state.birthDate);
      const birthdate = currentDate.toISOString().slice(0, 10);
      this.setState({birthdate: birthdate});

      if (Platform.OS === 'android') {
        this.setShowBirthdatePicker(false);
      }
    } catch (error) {
      this.setShowBirthdatePicker(false);
    }
  }

  doEdit = async () => {
    this.setState({status: 'loading'});

    const profileService = new ProfileService();

    const profile_info: Partial<UpdateProfile> = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email_address: this.state.email_address,
      birthdate: this.state.birthdate,
      phone: this.state.phone,
      sex: this.state.sex,
    };

    await profileService.updateMe(profile_info, this.props.auth_token);
    await profileService.getMe(this.props.auth_token, this.props.dispatch);

    this.setState({status: null});
    this.props.setVisible(false);
  };

  render() {
    return (
      <ProfileEditLayout
        state={this.state}
        visible={this.props.visible}
        setVisible={this.props.setVisible}
        handleInputChange={this.handleInputChange}
        handleDateChange={this.handleDateChange}
        setShowBirthdatePicker={this.setShowBirthdatePicker}
        doEdit={this.doEdit}
      />
    );
  }
}

function mapStatesToProps(state: any = {}) {
  return {
    user_data: state.auth.user.user_data,
    auth_token: state.auth.user.token,
  };
}

export default connect(mapStatesToProps)(EditProfile);
