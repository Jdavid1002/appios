import React, {Component} from 'react';

import {View, Linking, Alert, ActivityIndicator} from 'react-native';
import LessonCard from '../components/lesson-card';

import {connect} from 'react-redux';
import {Http, HttpCustomStructure} from 'app_utils/http';

import SimualcrumService from 'app_services/simulacrum/simulacrum';

import * as env from 'app_config/env.json';

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
  };
}

//Actualizar <state className="auth user toker"></state>

class LessonCardContainer extends Component<any> {
  state: any = {
    loading: true,
  };
  componentDidMount = () => {
    this.setState({loading: false});
  };

  goToLesson = async (lesson: any) => {
    this.setState({loading: true});

    const query_data: HttpCustomStructure = {
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      method: 'POST',
      url: '/api/auth/generate-token-with-session',
      auth_token: this.props.auth_token,
    };

    const data = await Http.send(query_data);
    const token: string = data.token_generated;

    if (data.status === 'success') {

      const matterId = this.props.matterId || ''
      const lesson_id = lesson?.id || ''
      const stage = this.props.stage || ''
      const resource_id = lesson?.childs[0]?.id || ''

      const external_url: any = env?.external_api?.lms?.url || ''
      const target = `app---resources---container_id=${matterId}&resource=${resource_id}&lesson=${lesson_id}&stage=${stage}`;
      const url = `${external_url}/login-by-token/${token}/${target}`;

      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
          setTimeout(() => {
            // Consulta las vidas disponibles
            const simualcrumService = new SimualcrumService();
            simualcrumService.getLivesAvailable(
              this.props.auth_token,
              this.props,
            );
          }, 5000);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
        this.setState({loading: false});
      });

    } else {
      Alert.alert(
        'Error',
        data.message,
        [{text: 'OK', onPress: () => this.props.navigation.navigate('Home')}],
        {cancelable: false},
      );
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#061946" />
        </View>
      );
    }

    return (
      <LessonCard
        {...this.props}
        onPress={() => this.goToLesson(this.props)}
        progress={this.props.progress}
      />
    );
  }
}

export default connect(mapStatesToProps)(LessonCardContainer);
