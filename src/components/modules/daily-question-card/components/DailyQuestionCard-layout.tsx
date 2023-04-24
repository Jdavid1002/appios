import React from 'react';
import {View, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import GeneralService from '../../../../services/general/general';

import {styles} from './../index';

interface DailyQuestionCardLayoutProps {
  data: any;
  getDailyQuestion: any;
}

const DailyQuestionCardLayout: React.FC<
  DailyQuestionCardLayoutProps
> = props => {
  const navigation = useNavigation();

  const generalService = new GeneralService();

  return (
    <View style={[styles.dailyQuestionCard]}>
      <Text style={[styles.title]}>Pregunta del día</Text>

      {props.data?.status === 'success' && (
        <React.Fragment>
          <Text style={[styles.text]} numberOfLines={4}>
            {generalService
              .stripTags(props.data?.questions[0].description)
              .trim()}
          </Text>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() =>
              navigation.navigate('SimulacrumQuestion', {
                questions: props.data,
                matterId: props.data.matter_id,
                level: props.data.questions[0].level,
              })
            }
            disabled={props.data?.status === 'error'}
            // rounded
            // small
          >
            <Text style={[styles.buttonText]}>Responder</Text>
          </TouchableOpacity>
        </React.Fragment>
      )}

      {props.data?.status === 'error' && (
        <Text style={[styles.text]} numberOfLines={4}>
          {props.data?.message === 'No tienes mas vidas'
            ? 'No tienes más oportunidades'
            : props.data?.message}
        </Text>
      )}

      {!props.data && <ActivityIndicator />}
    </View>
  );
};

export default DailyQuestionCardLayout;
