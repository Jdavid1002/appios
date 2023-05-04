import React from 'react';
import {View, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {styles} from './../index';
import { DailyQuestionType } from '../../../../reducers/daily-question/types';

interface DailyQuestionCardLayoutProps {
  data: DailyQuestionType;
  getDailyQuestion: any;
  lives : number
}

const DailyQuestionCardLayout: React.FC<
  DailyQuestionCardLayoutProps
> = props => {
  const navigation = useNavigation();

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

      {props.data?.questions?.length > 0 && props?.lives > 0 ? (
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
      ) : null}

      {!props.lives && (
        <Text style={[styles.text]} numberOfLines={4}>
          No tienes mas vidas
        </Text>
      )}

      {!props.data?.questions?.length && <ActivityIndicator />}
    </View>
  );
};

export default DailyQuestionCardLayout;
