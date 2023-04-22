import React, { Component } from 'react';
import { styles } from '../index'
import { Image, View } from 'react-native';
import { CustomText } from 'app_components/commons/customs/components/customComponents';
import MainStyles from 'app_styles/MainStyles';
import ButtonBlue from 'app_components/commons/buttons/components/button-blue';

const fail = require('app_assets/img/fail_simulacrum.png')
const success = require('app_assets/img/success_simulacrum.png')

const SimulacrumScore = (props: any) => {

  const nextResource = () => {
    props.navigation.navigate('Simulacrums')
  }

  return (
    <React.Fragment>
      <View style={styles.container}>
        <CustomText style={[MainStyles.textCenter, styles.titleScore]}>
          Tu calificación es de {props.route.params.score}/100
        </CustomText>
        <CustomText style={[MainStyles.textCenter, styles.descriptionScore]}>
          {props.route.params.approve ? 'Felicidades aprobaste tu evaluación' : 'Sigue practicando. Completa las lecciones e intenta nuevamente.'}
        </CustomText>
        <Image source={props.route.params.approve ? success : fail} style={styles.image} />
        <ButtonBlue
          textBtn="Siguiente recurso"
          style={styles.nextButton}
          fontStyle={styles.textButton}
          onPressBtn={nextResource}
        />
      </View>
    </React.Fragment>
  )
}

export default SimulacrumScore
