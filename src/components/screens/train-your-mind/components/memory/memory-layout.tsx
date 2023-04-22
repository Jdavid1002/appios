import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Thumbnail, Icon } from 'native-base';

import { styles } from '../../index';
import gameStyles from './styles'

const MemoryThumbnail: React.FC<any> = (props: any) => {
  return (
    <View style={[gameStyles.thumbnail, props.style]}>
      <Thumbnail source={props.source} style={{ width: '80%', height: '80%' }} square />
    </View>
  )
}

const MemoryLayout: React.FC<any> = (props: any) => {
  return (
    <View style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[styles.wrapper, gameStyles.wrapper]}
      >
        <Text style={[styles.gameTitle, { marginBottom: 20 }]}>Memoria</Text>
        <Text
          style={[gameStyles.instructions]}
        >
          Memoriza las siguientes imágenes y colócalas en el mismo orden. Logra cuantas más puedas.
        </Text>

        {props.isActive && (
          <React.Fragment>
            <Text style={[gameStyles.levelText]}>
              Nivel {props?.level}
            </Text>

            {props.answered.length > 0 && JSON.stringify(props?.question?.answer) === JSON.stringify(props.answered) && (
              <View style={[styles.feedBackIconContainer, { borderColor: '#7aab62' }]}>
                <Icon type="FontAwesome" name="check" style={[styles.feedBackIcon, { color: '#7aab62' }]} />
              </View>
            )}

            {props.answered.length > 0 && JSON.stringify(props?.question?.answer) !== JSON.stringify(props.answered) && (
              <View style={[styles.feedBackIconContainer, { borderColor: '#e94044' }]}>
                <Icon type="FontAwesome" name="close" style={[styles.feedBackIcon, { color: '#e94044' }]} />
              </View>
            )}

            <Text
              style={[gameStyles.helpText]}>
              {props.isShow && `Tienes ${props.showRemaining.m}:${props.showRemaining.s} para memorizar:`}
              {!props.isShow && `Seleccione su respuesta:`}
            </Text>

            <View style={[gameStyles.container]}>

              {props.isShow &&
                props?.question?.question.map((q: any, i: number) =>
                  <MemoryThumbnail key={i} source={q} />
                )}

              {!props.isShow && props?.tempAnswer.map((a: any, i: number) =>
                <MemoryThumbnail key={i} source={a} style={[gameStyles.thumbnail]} />
              )}

              {!props.isShow && Array.from({ length: props?.question?.question.length - props?.tempAnswer.length }).map(() => (
                <MemoryThumbnail style={[gameStyles.thumbnail, { borderStyle: 'dashed' }]} />
              ))}
            </View>
          </React.Fragment>
        )}

        {!props.isShow && (
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            {props.question?.options.filter((option: any) => !props?.tempAnswer.includes(option)).map((option: string, i: number) => (
              <TouchableOpacity key={i} onPress={() => props.doAnswer(props.question?.options?.length, option)}>
                <MemoryThumbnail key={i} source={option} style={[gameStyles.thumbnail, { width: 64, height: 64 }]} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={[gameStyles.timer]}>
          {`${props.remaining.m}:${props.remaining.s}`}
        </Text>

      </ScrollView>
    </View>
  );
};

export default MemoryLayout;
