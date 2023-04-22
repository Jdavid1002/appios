import React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import {Text, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native'
import {styles} from './../index';
import { TriviaType } from 'app_reducers/trivia/types';

interface TriviaCardLayoutProps {
  trivia: TriviaType;
  getTriviaData: any;
}

const TriviaCardLayout: React.FC<TriviaCardLayoutProps> = props => {

  const navigation = useNavigation();

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
            <Text style={[styles.brainsText]}>
              +10
            </Text>
          </View>
        </View>

        <Text style={[styles.subtitle]} numberOfLines={2}>
          {props?.trivia?.content}
        </Text>
        <Button
          onPress={() => navigation.navigate('TriviaScreen', {trivia: props?.trivia})}
          style={[styles.button]}
          disabled={!props?.trivia}
          rounded
          small>
          {!props?.trivia && <ActivityIndicator />}

          <Text style={[styles.buttonText]}>
            Responder trivia
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default TriviaCardLayout;
