import React from 'react';
import {View, ImageBackground} from 'react-native';
import styles from '../styles/styles';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import {TouchableOpacity} from 'react-native-gesture-handler';

function ChallengeCardComponent(props: any) {
  const {title, color, bgColor, progress, backgroundImage, isDiagnostic} =
    props;

  return (
    <TouchableOpacity onPress={() => props.onPress(props.id)}>
      <ImageBackground source={{uri: backgroundImage}} style={styles.container}>
        <CustomText style={[styles.title, {color}]}>{title}</CustomText>

        {isDiagnostic ? (
          <>
            <View
              style={[styles.progressBackground, {backgroundColor: bgColor}]}>
              <View
                style={[
                  styles.progressBar,
                  {backgroundColor: color, width: `${progress}%`},
                ]}
              />
            </View>
            <CustomText style={[styles.textDescription, {color}]}>
              Progreso para crear tu ruta de aprendizaje
            </CustomText>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.button, {backgroundColor: color}]}
            onPress={() => props.onPress(props.id)}>
            <CustomText style={[styles.buttonText]}>
              Continuar mi ruta de aprendizaje
            </CustomText>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default ChallengeCardComponent;
