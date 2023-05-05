import React from 'react';
import {View, ScrollView, Text, TouchableHighlight } from 'react-native';
import {styles} from '../../../../../components/screens/train-your-mind';
import gameStyles from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle, faClose} from '@fortawesome/free-solid-svg-icons';

const SpellIt = (props: any) => {
  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={[styles.wrapper, gameStyles.wrapper]}>
        <Text style={[styles.gameTitle, {marginBottom: 20}]}>Deletréalo</Text>
        <Text style={[gameStyles.instructions]}>
          ¿Qué tanto puedes deletrear? Selecciona la letra que hace falta y mide tus conocimientos en ortografía.
        </Text>

        {props.isActive && (
          <React.Fragment>

            {props.answered && props.answered === props?.question?.answer && (
              <View style={[styles.feedBackIconContainer, { borderColor: '#7aab62' }]}>
                <FontAwesomeIcon 
                  icon={faCheckCircle}  
                  color='#7aab62'
                />
              </View>
            )}

            {props.answered && props.answered !== props?.question?.answer && (
              <View style={[styles.feedBackIconContainer, { borderColor: '#e94044' }]}>
                <FontAwesomeIcon 
                  icon={faClose}  
                  color='#e94044'
                />
              </View>
            )}

            <Text style={[styles.gameTitle, gameStyles.word]}>
              {!props.answered && props?.question?.question}
              {props.answered && props?.question?.question.replace('_', props.answered)}
            </Text>

            <View style={{flexDirection: 'row', marginBottom: 32}}>
              {props.question?.options.map((option: string) => (
                <TouchableHighlight
                  key={option}
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
                  <Text style={{fontSize : 24, color : 'black'}} >{option}</Text>
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
