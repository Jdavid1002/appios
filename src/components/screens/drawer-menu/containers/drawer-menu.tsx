import React, {Component} from 'react';
import {ScrollView, View, TouchableOpacity, Image, Alert, SafeAreaView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {LOGOUT} from '../../../../reducers/auth/types';

import DrawerMenuItem from './drawer-menu-item';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';

import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';


const DrawerMenu  = (props : any) => { 

  const navigation = useNavigation()

  const confirmLogout = () => {
    Alert.alert('Cerrar sesión', '¿Está seguro que desea cerrar sesión?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Si, cerrar sesión', onPress: doLogout},
    ]);
  };

  const doLogout = () => {
    props.dispatch({
      type: LOGOUT,
      payload: null,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.toggleDrawer();
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
          onPress={() => navigation.navigate('Home')}
        />
        <DrawerMenuItem
          name="Retos"
          onPress={() => navigation.navigate('Challenges')}
        />
        <DrawerMenuItem
          name="Simulacros"
          onPress={() => navigation.navigate('Simulacrums')}
        />
        <DrawerMenuItem
          name="Entrena tu mente"
          onPress={() => navigation.navigate('Train-your-mind')}
        />
        {/* <DrawerMenuItem
          name="Tips"
          onPress={() => navigation.navigate('Tips')}
        /> */}
        <DrawerMenuItem
          name="Ranking"
          onPress={() =>
            navigation.navigate('Profile', {initialTab: 1})
          }
        />
        <DrawerMenuItem
          name="Perfil"
          onPress={() => navigation.navigate('Profile')}
        />
      </ScrollView>

      <DrawerMenuItem
        name="Acerca de"
        onPress={() => navigation.navigate('AboutScreen')}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={confirmLogout}>
          <CustomText style={styles.itemText}> Cerrar sesión </CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default connect(null)(DrawerMenu);
