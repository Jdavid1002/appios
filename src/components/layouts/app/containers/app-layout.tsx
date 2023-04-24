import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';

// import {Drawer} from 'app_router/drawer-navigator';

// import DrawerMenu from 'app_components/screens/drawer-menu/containers/drawer-menu';
import {AppStackNavigator} from '../../../../router/app-stack-navigator/stack-navigator';
// import HomeScreen from 'app_components/screens/home/containers/home';
// import ChallengeScreen from 'app_components/screens/challenge/containers/challenge';

// import mainStyles from 'app_styles/MainStyles';

class AppLayout extends Component {
  render() {
    return <AppStackNavigator />;
  }
}

export default connect(null)(AppLayout);
