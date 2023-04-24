import React from 'react';
import {View, Image} from 'react-native';
import styles from '../styles/styles-card-simple';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import {TouchableOpacity} from 'react-native-gesture-handler';

function ChallengeCardComponent(props: any) {
  const styleContainer = props.loading
    ? styles.containerLoading
    : styles.containerSimple;

  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.id)}
      style={styleContainer}>
      <Image style={styles.cardImageLeft} source={props.imageLeft} />
      {props.loading ? (
        <View style={styles.containerRight}>
          <CustomText style={[styles.loadingTitle, {color: props.color}]}>
            Calculando ruta…
          </CustomText>
          <CustomText style={[styles.loadingDescription, {color: props.color}]}>
            Pronto estará disponible
          </CustomText>
        </View>
      ) : (
        <View style={styles.containerRight}>
          {!props.loading ? (
            <Image
              style={styles.brainImage}
              source={require('assets/img/brain.png')}
            />
          ) : null}

          <CustomText style={styles.textInfo}>
            {' '}
            +{props.brains_can_get}{' '}
          </CustomText>
          <CustomText style={[styles.title, {color: props.color}]}>
            {props.title}
          </CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default ChallengeCardComponent;
