import React from 'react';
import {View, Image, ActivityIndicator, Text, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './../index';
import {TriviaType} from '../../../../reducers/trivia/types';
import { useSelector } from 'react-redux';
import moment from 'moment';

interface TriviaCardLayoutProps {
  trivia: TriviaType;
  getTriviaData: any;
}

const TriviaCardLayout: React.FC<TriviaCardLayoutProps> = props => {
  const navigation = useNavigation();
  const lastAnswerTrivia = useSelector((state : any) => state.notAuthInfo.answerOfDateTriviaDay.date)

  const validateDateOfLastAnswerTrivia = () => {
    if(!lastAnswerTrivia) return true;
  
    if(moment().isAfter(moment(lastAnswerTrivia).add('1', 'day'))){
      return true
    }
    return false
  }

  const regex = /(<([^>]+)>)/ig;
  const result = props?.trivia?.content?.replace(regex, '');

  return (
    <View style={[styles.triviaCard]}>
      <Image
        style={[styles.image]}
        resizeMode="contain"
        source={require('assets/img/home/trivia/question.png')}
      />
      <View style={[styles.container]}>
        <View style={[styles.topLine]}>
          <Text style={[styles.title]}>Trivia del día</Text>
          <View style={[styles.brains]}>
            <Image source={require('assets/img/brain.png')} />
            <Text style={[styles.brainsText]}>+10</Text>
          </View>
        </View>

        <Text style={[styles.subtitle]} numberOfLines={2}>
          {!validateDateOfLastAnswerTrivia() 
            ? 'No existen mas trivias por hoy.' : 
            result ? result : 'No hay trivias disponibles.' 
          }
        </Text>

        {validateDateOfLastAnswerTrivia() &&
          <TouchableHighlight
            onPress={() =>
              navigation.navigate('TriviaScreen', {trivia: props?.trivia})
            }
            style={[styles.button]}
            disabled={!props?.trivia}
          >
            <>
              {result ? <Text style={[styles.buttonText]}>Responder trivia</Text>  : null}            
            </>
          </TouchableHighlight>
        }

      </View>
    </View>
  );
};

export default TriviaCardLayout;
