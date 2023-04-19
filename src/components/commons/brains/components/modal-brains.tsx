import React from 'react';
import {Modal, View, Image} from 'react-native';

import {CustomText} from 'app_components/commons/customs/components/customComponents';
import ButtonBlue from 'app_components/commons/buttons/components/button-blue';

import styles from '../styles/styles-modal-brain';

function ModalLives(props: any){
  return (
    <Modal {...props} >
        <View style={styles.container}>
          <View style={styles.wraper}>
            <CustomText style={styles.title}>Respuesta Correcta</CustomText>
            <CustomText style={styles.text}>Ganaste:</CustomText>
            <View style={styles.brainsContainer}>
            	<Image style={styles.img} source={require('assets/img/brain_lg.png')}/>
            	<CustomText style={styles.brainsNumber}>+{props.brains}</CustomText>
            </View>
            <ButtonBlue style={{marginBottom: 15, marginHorizontal: 20}} fontStyle={{fontSize: 20, paddingVertical: 0}} textBtn="Siguiente" onPressBtn={props.onCloseModal} />

          </View>
        </View>
    </Modal>
  );
}

export default ModalLives;