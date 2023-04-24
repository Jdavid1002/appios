import React from 'react';
import {Modal, View, Image} from 'react-native';

import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import ButtonBlue from '../../../../components/commons/buttons/components/button-blue';
import ButtonRed from '../../../../components/commons/buttons/components/button-red';

import styles from '../styles/styles-modal-lives';

function ModalLives(props: any) {
  return (
    <Modal {...props}>
      <View style={styles.container}>
        <View style={styles.wraper}>
          {!props.onliInfo ? (
            <>
              <CustomText style={styles.title}>
                Respuesta Incorrecta{' '}
              </CustomText>
              <CustomText style={styles.text}>
                Perdiste una oportunidad. ¡Hazlo mejor en la próxima!
              </CustomText>
            </>
          ) : (
            <CustomText style={styles.title}>No tienes vidas </CustomText>
          )}

          <View style={styles.starContainer}>
            {props.lives === 3 ? (
              <>
                <Image
                  style={styles.star}
                  source={require('assets/img/star.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star.png')}
                />
              </>
            ) : (
              <View />
            )}

            {props.lives === 2 ? (
              <>
                <Image
                  style={styles.star}
                  source={require('assets/img/star.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star-light.png')}
                />
              </>
            ) : (
              <View />
            )}

            {props.lives === 1 ? (
              <>
                <Image
                  style={styles.star}
                  source={require('assets/img/star.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star-light.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star-light.png')}
                />
              </>
            ) : (
              <View />
            )}

            {props.lives === 0 ? (
              <>
                <Image
                  style={styles.star}
                  source={require('assets/img/star-light.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star-light.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star-light.png')}
                />
              </>
            ) : (
              <View />
            )}
          </View>

          {props.lives === 0 ? (
            <>
              <CustomText style={styles.text}>
                Puedes esperar
                <CustomText style={styles.textBold}> 15 minutos </CustomText>o
                mira las lecciones de tus respuestas erróneas, así tendrás
                <CustomText style={styles.textBold}>
                  {' '}
                  3 nuevas oportunidades.{' '}
                </CustomText>
              </CustomText>
              <ButtonRed
                style={{marginBottom: 15, marginHorizontal: 20}}
                fontStyle={{fontSize: 20, paddingVertical: 0}}
                textBtn={props.onliInfo ? 'Cerrar' : 'Ir a simulacros'}
                onPressBtn={props.onCloseModal}
              />
            </>
          ) : (
            <ButtonBlue
              style={{marginBottom: 15, marginHorizontal: 20}}
              fontStyle={{fontSize: 20, paddingVertical: 0}}
              textBtn="Cerrar"
              onPressBtn={props.onCloseModal}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

export default ModalLives;
