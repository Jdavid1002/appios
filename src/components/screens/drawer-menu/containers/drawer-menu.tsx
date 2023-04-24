import React, {Component} from 'react';
import {ScrollView, View, TouchableOpacity, Image, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {LOGOUT} from '../../../../reducers/auth/types';

import DrawerMenuItem from './drawer-menu-item';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';

import styles from '../styles/styles';

class DrawerMenu extends Component<any> {
  confirmLogout = () => {
    Alert.alert('Cerrar sesión', '¿Está seguro que desea cerrar sesión?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Si, cerrar sesión', onPress: this.doLogout},
    ]);
  };

  doLogout = () => {
    this.props.dispatch({
      type: LOGOUT,
      payload: null,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}>
              <FontAwesomeIcon icon={faTimes} color={'#24ABDF'} size={32} />
            </TouchableOpacity>
            <Image
              style={styles.headerIamge}
              source={require('assets/img/menu_header.png')}
            />
          </View>

          <DrawerMenuItem
            name="Inicio"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <DrawerMenuItem
            name="Retos"
            onPress={() => this.props.navigation.navigate('Challenges')}
          />
          <DrawerMenuItem
            name="Simulacros"
            onPress={() => this.props.navigation.navigate('Simulacrums')}
          />
          <DrawerMenuItem
            name="Entrena tu mente"
            onPress={() => this.props.navigation.navigate('Train-your-mind')}
          />
          <DrawerMenuItem
            name="Tips"
            onPress={() => this.props.navigation.navigate('Tips')}
          />
          <DrawerMenuItem
            name="Ranking"
            onPress={() =>
              this.props.navigation.navigate('Profile', {initialTab: 1})
            }
          />
          <DrawerMenuItem
            name="Perfil"
            onPress={() => this.props.navigation.navigate('Profile')}
          />
        </ScrollView>

        <DrawerMenuItem
          name="Acerca de"
          onPress={() => this.props.navigation.navigate('AboutScreen')}
        />

        <View style={styles.footer}>
          <TouchableOpacity onPress={this.confirmLogout}>
            <CustomText style={styles.itemText}> Cerrar sesión </CustomText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(null)(DrawerMenu);
