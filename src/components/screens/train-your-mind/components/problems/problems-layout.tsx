import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Text, Button, Icon } from 'native-base';

import gameStyles from './styles'

import { styles } from 'app_components/screens/train-your-mind';

const SpellIt = (props: any) => {
  props.question&& console.log('options', props.question?.options)
  return (
    <View style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[
          styles.wrapper,
          gameStyles.wrapper
        ]}>

        <Text style={[styles.gameTitle, { marginBottom: 20 }]}>
          Solución de problema
        </Text>

        <Text
          style={[gameStyles.instructions]}>
          Selecciona la respuesta correcta de la siguiente operación matemática.
        </Text>
        
        {props.isActive && (
          <React.Fragment>

            <Text style={[gameStyles.levelText]}>
              Nivel {props?.level}
            </Text>

            {props.answered && props.answered === props?.question?.answer && (
              <View style={[styles.feedBackIconContainer, { borderColor: '#7aab62' }]}>
                <Icon type="FontAwesome" name="check" style={[styles.feedBackIcon, { color: '#7aab62' }]} />
              </View>
            )}

            {props.answered && props.answered !== props?.question?.answer && (
              <View style={[styles.feedBackIconContainer, { borderColor: '#e94044' }]}>
                <Icon type="FontAwesome" name="close" style={[styles.feedBackIcon, { color: '#e94044' }]} />
              </View>
            )}

            <Text style={[styles.gameTitle, gameStyles.word]}>
              {props?.question?.question} {props.answered && `= ${props?.question?.answer}`}
            </Text>

            <View style={{ width: '100%' }}>
              {props.question?.options.map((option: string, index: number) => (
                <Button
                  key={index}
                  style={[
                    { marginBottom: 16, paddingHorizontal: 16},
                    props.answered &&
                    props?.question?.answer === option &&
                    { backgroundColor: '#8ec772' },
                    props.answered &&
                    props?.question?.answer !== option &&
                    { backgroundColor: '#e94044' }
                  ]}
                  onPress={() => props.doAnswer(option)}
                  block
                  rounded
                >
                  <Text>{option}</Text>
                </Button>
              ))}
            </View>

            <Text style={[gameStyles.timer]}>
              {`${props.remaining.m}:${props.remaining.s}`}
            </Text>
          </React.Fragment>
        )}
      </ScrollView>
    </View>
  );
};

export default SpellIt;
