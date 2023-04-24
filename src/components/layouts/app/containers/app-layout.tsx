import React from 'react';
import {connect} from 'react-redux';
import {View, Image,SafeAreaView} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../../../components/screens/home/containers/home';
import SimulacrumScreen from '../../../../components/screens/simulacrum/containers/simulacrum';
import { NavigationContainer } from '@react-navigation/native';
import DrawerMenu from '../../../screens/drawer-menu/containers/drawer-menu';
import ProfileScreen from '../../../screens/profile';
import TrainYourMind from '../../../screens/train-your-mind/containers/tym';
import ChallengeScreen from '../../../screens/challenge/containers/challenge';
import TipsScreen from '../../../screens/tips/containers/tips';
import Header from '../../../commons/header/containers/header';

const Drawer = createDrawerNavigator();

const AppLayout = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerMenu {...props} />}
        screenOptions={{
          header : (headerParams: any) => {
            const navigation = headerParams?.navigation;
            const previous = headerParams?.progress?.previous
            const title = (headerParams?.route?.name && headerParams?.route?.name !== 'Home') || <Image source={require('../../../../assets/img/logo_iq.png')} />;
            const plain = headerParams?.route?.params?.headerPlain
            return (
              <Header
                title={title}
                leftButton={false}
                rightButton={false}
                plain={plain}
                navigation={navigation}
                previous={previous}
              />
            );
          }
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{headerPlain: true}}
        />
        <Drawer.Screen
          name="Challenges"
          component={ChallengeScreen}
          options={{title: 'Retos'}}
        />
        <Drawer.Screen 
          name="Simulacrums"
          component={SimulacrumScreen}
          options={{title: 'Simulacros'}}
        />
        <Drawer.Screen
          name="Tips"
          component={TipsScreen}
          options={{title: 'Noticias'}}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: 'Perfil'}}
          initialParams={{
            headerPlain: true,
            rightButton: <View />,
          }}
        />
        <Drawer.Screen
          name="Train-your-mind"
          component={TrainYourMind}
          options={{title: 'Entrena tu mente'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )

}

export default connect(null)(AppLayout);
