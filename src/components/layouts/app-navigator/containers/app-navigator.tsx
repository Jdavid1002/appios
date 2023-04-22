import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {AppState, NativeEventSubscription} from 'react-native';

import {Http, HttpCustomStructure} from '../../../../utils/http';
import LayoutApp from '../../app/containers/app-layout';
import LayoutAuthentication from '../../authentication/containers/authentication-layout';
import {LOGOUT} from '../../../../reducers/auth/types';

function mapStatesToProps(state: any = {}) {
  return {
    auth: state.auth,
    auth_token: state?.auth?.user?.token,
    user_id: state?.auth?.user?._id,
    alliance_id: state?.auth?.user?.alliance_id,
  };
}

class AppNavigator extends Component<any, any> {
  appStateSubscription?: NativeEventSubscription;

  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    //@ts-ignore
    this.appStateSubscription = AppState.addEventListener(
      'change',
      nextAppState => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          this.checkSession();
        }
        this.setState({appState: nextAppState});
      },
    );
  }

  async checkSession() {
    const query_data: HttpCustomStructure = {
      method: 'GET',
      url: '/api/auth/check-session-token',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this?.props?.auth_token,
      }),
      params: {
        alliance_id: this?.props?.alliance_id,
        user_id: this?.props?.user_id,
      },
      auth_token: this?.props?.auth_token,
    };
    const data = await Http.send(query_data);

    if (data?.code !== 200) {
      this.props.dispatch({
        type: LOGOUT,
        payload: null,
      });
    }
  }

  render() {

    return (
      <Fragment>
        <LayoutAuthentication />
      </Fragment>
    );
    // if (!this.props.auth.user) {
    //   return (
    //     <Fragment>
    //       <LayoutAuthentication />
    //     </Fragment>
    //   );
    // }
    // return (
    //   <Fragment>
    //     <LayoutApp />
    //   </Fragment>
    // );
  }
}

export default connect(mapStatesToProps)(AppNavigator);
