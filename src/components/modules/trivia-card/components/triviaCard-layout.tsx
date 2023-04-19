import React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import {Text, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native'

import GeneralService from 'app_services/general/general';

import {styles} from './../index';

interface TriviaCardLayoutProps {
  trivia: any;
  getTriviaData: any;
}

const TriviaCardLayout: React.FC<TriviaCardLayoutProps> = props => {

  const navigation = useNavigation();

  const generalService = new GeneralService();

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
          {props.trivia?.brains_to_assign && (
            <View style={[styles.brains]}>
              <Image source={require('assets/img/brain.png')} />
              <Text style={[styles.brainsText]}>
                +{props.trivia.brains_to_assign}
              </Text>
            </View>
          )}
        </View>
        <Text style={[styles.subtitle]} numberOfLines={2}>
          {props.trivia?.questions && generalService.stripTags(props.trivia?.questions[0].description)}
          {props.trivia?.status === 'error' && props.trivia.message}
        </Text>
        <Button
          onPress={() => navigation.navigate('TriviaScreen', {trivia: props.trivia})}
          style={[styles.button, props.trivia?.status === 'error' && {
            backgroundColor: '#f8f8f8'
          }]}
          disabled={!props.trivia || props.trivia?.status === 'error'}
          rounded
          small>
          {!props.trivia && <ActivityIndicator />}

          <Text style={[styles.buttonText, props.trivia?.status === 'error' && {color: '#888'}]}>
            Responder trivia
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default TriviaCardLayout;
