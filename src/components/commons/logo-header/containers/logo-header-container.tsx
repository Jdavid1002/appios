import React, { Component } from 'react';
import {StatusBar, Image, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import {
  Header,
  Left,
  Body,
  Right,
} from 'native-base';

import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

class LogoHeaderContainer extends  Component <any> {
	render (){
		return (
    <Header
    	style={styles.container}
	    androidStatusBarColor="#061946"
	    transparent
	    >
	    <StatusBar
        translucent={true}
        backgroundColor="#061946"
        barStyle="light-content"
      />
	   	<Left>
	   		{(typeof this.props.navigation !== 'undefined') ?
		   		<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
		    		<FontAwesomeIcon icon={faArrowLeft} color={'#24ABDF'} size={32} />
		    	</TouchableOpacity>
		    	:
		    	<TouchableOpacity/>
		    }
	    </Left>
	    <Body style={styles.logo} >
	      <Image source={require('assets/img/logo_registro.png')} />
	    </Body>
	    <Right />
    </Header>
	  );
	}
}

export default LogoHeaderContainer;
