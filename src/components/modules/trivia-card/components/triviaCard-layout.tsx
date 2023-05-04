import React from 'react';
import {View, Image, ActivityIndicator, Text, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './../index';
import {TriviaType} from '../../../../reducers/trivia/types';

interface TriviaCardLayoutProps {
  trivia: TriviaType;
  getTriviaData: any;
}

const TriviaCardLayout: React.FC<TriviaCardLayoutProps> = props => {
  const navigation = useNavigation();

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
          {result}
        </Text>

        <TouchableHighlight
          onPress={() =>
            navigation.navigate('TriviaScreen', {trivia: props?.trivia})
          }
          style={[styles.button]}
          disabled={!props?.trivia}
          >
            <>
              {!props?.trivia && <ActivityIndicator />}
              <Text style={[styles.buttonText]}>Responder trivia</Text>
            </>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default TriviaCardLayout;
