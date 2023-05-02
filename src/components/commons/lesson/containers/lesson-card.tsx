import React, {Component} from 'react';

import {View, Linking, Alert, ActivityIndicator} from 'react-native';
import LessonCard from '../components/lesson-card';

import {connect} from 'react-redux';
import {Http, HttpCustomStructure} from '../../../../utils/http';

import SimualcrumService from '../../../../services/simulacrum/simulacrum';

import * as env from '../../../../config/env.json';

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
  secure_home_path = '/app'

  componentDidMount = () => {
    this.setState({loading: false});
  };

  handleClickItem = (item: any) => {
    const params = {
      course: objectURL.course,
      structure: objectURL.structure,
      group: item?.item?.academic_group_resource
    }
    const _route = routerService.getRouteFromObject(params, 'V2/resources')
    if (props.history) {
      props.history.push(_route)
    } else {
      updateRoute(_route)
    }
  }


  getRouteFromObject = (_object: Object, screen: string) => {

    // @INFO Obtener las propiedades definidas
    const params = Object.keys(_object).reduce((accum: Object, item: string) => {
      // @ts-ignore
      if(_object[item]){
        accum = {
          ...accum,
          // @ts-ignore
          [item]: _object[item],
        }
      }
      return accum
    }, {})

    // @INFO Formar la ruta con las propiedades del objeto
    const keys = Object.keys(params)
    let route = keys.reduce((acum: string, item: string, idx: number) => {
      if (idx === keys.length - 1) {
        // @ts-ignore
        acum = `${acum}${item}=${params[item]}`
      } else {
        // @ts-ignore
        acum = `${acum}${item}=${params[item]}&`
      }
      return acum
    }, '')
    route = `/${screen}/${route}`

    route = this.getSecurePath(route)

    return route
  }

  getSecurePath(path: string = this.secure_home_path) {
    let new_path = path
    if (this.secure_home_path !== '/' && path !== this.secure_home_path) {
      new_path = `${this.secure_home_path}${(path !== '/') ? path : ''}`
    }
    return new_path
  }
  

  goToLesson = async (lesson: any) => {

    const matterId = this.props.matterId || ''
    const lesson_id = lesson?.id || ''
    const stage = this.props.stage || ''
    const resource_id = lesson?.childs[0]?.id || ''

    const paramsRoute = {
      container_id: matterId,
      resource: resource_id,
      lesson: lesson_id,
      stage: stage,
    }

    const _route = this.getRouteFromObject(paramsRoute, 'resources')
    const _route_replace_slash = _route.slice(1).replace(/\//g, '---')

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

      const external_url: any = env?.external_api?.lms?.url || ''
      const url = `${external_url}/login-by-token/${token}/${_route_replace_slash}`;

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
