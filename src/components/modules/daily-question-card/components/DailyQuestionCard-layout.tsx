import React from 'react';
import {View, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {styles} from './../index';
import { DailyQuestionType } from '../../../../reducers/daily-question/types';
import { useSelector } from 'react-redux';
import moment from 'moment';

interface DailyQuestionCardLayoutProps {
  data: DailyQuestionType;
  getDailyQuestion: any;
  lives : number
}

const DailyQuestionCardLayout: React.FC<
  DailyQuestionCardLayoutProps
> = props => {
  const navigation = useNavigation();

  const lastAnswerDailyQuestion = useSelector((state : any) => state.notAuthInfo.answerOfDateQuestionDay?.date)

  const validateDateOfLastAnswerDailyQuestion = () => {
    if(!lastAnswerDailyQuestion) return true;

    if(moment().isAfter(moment(lastAnswerDailyQuestion).add('1', 'day'))){
      return true
    }
    return false
  }


  const cutContentOfQuestion = (text : string) => {
    if (text?.length > 100) {
      return text.slice(0, 100) + '...';
    } else {
      return text
    }
  }

  return (
    <View style={[styles.dailyQuestionCard]}>
      <Text style={[styles.title]}>Pregunta del día</Text>

      {!validateDateOfLastAnswerDailyQuestion() && props.lives ? 
        <Text style={[styles.text]} numberOfLines={4}>
          No existen mas preguntas por hoy.
        </Text>
      : props.data?.questions?.length > 0 && props?.lives > 0 ? (
        <React.Fragment>
          <Text style={[styles.text]} numberOfLines={4}>
            {cutContentOfQuestion(props.data?.title)}
          </Text>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() =>
              navigation.navigate('SimulacrumQuestion', {
                section :  props.data,
                dontUseStatistics : true,
                isQuestionOfDay : true
              })
            }
            disabled={props.data?.status === 'error'}
          >
            <Text style={[styles.buttonText]}>Responder</Text>
          </TouchableOpacity>
        </React.Fragment>
        )
      : null} 
      

      {!props.lives && (
        <Text style={[styles.text,  {textAlign : 'center'}]} numberOfLines={4}>
          No tienes mas vidas, volverás a tener en los siguientes 15 minutos.
        </Text>
      )}

      {!props.data?.questions?.length && <ActivityIndicator />}
    </View>
  );
};

export default DailyQuestionCardLayout;
