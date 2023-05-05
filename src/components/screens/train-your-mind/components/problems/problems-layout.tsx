import React from 'react';
import { View, ScrollView, Text, TouchableHighlight } from 'react-native';
import gameStyles from './styles';

import { styles } from '../../../../../components/screens/train-your-mind';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faClose} from '@fortawesome/free-solid-svg-icons';

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
                <FontAwesomeIcon icon={faCheck}  color='#7aab62' />
              </View>
            )}

            {props.answered && props.answered !== props?.question?.answer && (
              <View style={[styles.feedBackIconContainer, { borderColor: '#7aab62' }]}>
                <FontAwesomeIcon icon={faClose}  color='#7aab62' />
              </View>
            )}

            <Text style={[styles.gameTitle, gameStyles.word]}>
              {props?.question?.question} {props.answered && `= ${props?.question?.answer}`}
            </Text>

            <View style={{ width: '100%' , justifyContent : 'center', gap : 10, flexDirection : 'row' , flexWrap : 'wrap', marginBottom : 100}}>
              {props.question?.options.map((option: string, index: number) => (
                <TouchableHighlight
                  key={index}
                  style={[
                    {marginLeft: 16, borderRadius: 100, borderWidth : 1, width : 50, height : 50, justifyContent : 'center', alignItems : 'center'},

                    props.answered &&
                    props?.question?.answer === option &&
                    { backgroundColor: '#8ec772' },
                    props.answered &&
                    props?.question?.answer !== option &&
                    { backgroundColor: '#e94044' }
                  ]}
                  onPress={() => props.doAnswer(option)}
                >
                  <Text>{option}</Text>
                </TouchableHighlight>
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
