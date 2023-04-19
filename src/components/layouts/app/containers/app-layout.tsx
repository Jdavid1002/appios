import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';

// import {Drawer} from 'app_router/drawer-navigator';

import DrawerMenu from 'app_components/screens/drawer-menu/containers/drawer-menu';
import {AppStackNavigator} from 'app_router/app-stack-navigator/stack-navigator';
// import HomeScreen from 'app_components/screens/home/containers/home';
// import ChallengeScreen from 'app_components/screens/challenge/containers/challenge';

import mainStyles from 'app_styles/MainStyles';

import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

class AppLayout extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerStyle={mainStyles.navDrawer}
          drawerContent={(props: any) => <DrawerMenu {...props} />}>
          <Drawer.Screen name="AppStart" component={AppStackNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(null)(AppLayout);
