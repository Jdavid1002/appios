import React from 'react';
import {View} from 'react-native';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';

import styles from '../styles/styles-bar-vertical';

function darkColor(color: string, cant: number) {
  let rojo = color.substr(1, 2);
  let verd = color.substr(3, 2);
  let azul = color.substr(5, 2);

  rojo = Math.abs(parseInt(rojo, 16) - cant).toString(16);
  verd = Math.abs(parseInt(verd, 16) - cant).toString(16);
  azul = Math.abs(parseInt(azul, 16) - cant).toString(16);

  if (rojo.length < 2) rojo = '0' + rojo;
  if (verd.length < 2) verd = '0' + verd;
  if (azul.length < 2) azul = '0' + azul;

  return '#' + rojo + verd + azul;
}

function barVertical(props: any) {
  const progress = props.progress ? props.progress : 0;
  let color = props.color;
  let colorDark = darkColor(props.color, 30);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.barWrapper}>
          <View style={styles.bar}>
            <View style={[styles.ovalShadow]} />
            <View style={[styles.rectShadow, {height: 100 - progress + '%'}]} />
            <View
              style={[
                styles.oval,
                styles.ovalTop,
                {backgroundColor: colorDark},
              ]}
            />
            <View
              style={[
                styles.rect,
                {backgroundColor: color, height: progress + '%'},
              ]}
            />
            <View style={[styles.oval, {backgroundColor: color}]} />
          </View>
        </View>
      </View>
      {props.displayValue === true ? (
        <View>
          <CustomText style={styles.label}> {progress}% </CustomText>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}
export default barVertical;
