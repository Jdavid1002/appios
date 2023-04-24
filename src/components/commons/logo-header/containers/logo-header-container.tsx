import React, {Component} from 'react';
import {StatusBar, Image, TouchableOpacity, Text, View} from 'react-native';
import styles from '../styles/styles';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

class LogoHeaderContainer extends Component<any> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="#061946"
          barStyle="light-content"
        />
        {typeof this?.props?.navigation !== 'undefined' ? (
          <TouchableOpacity onPress={() => this?.props?.navigation?.goBack && this?.props?.navigation?.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} color={'#24ABDF'} size={32} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity />
        )}
        <Image source={require('../../../../assets/img/logo_registro.png')} />
      </View>
    );
  }
}

export default LogoHeaderContainer;
