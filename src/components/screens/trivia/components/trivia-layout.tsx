import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Text, Button} from 'native-base';

import InlineWebview from 'app_components/commons/webview';

import {styles} from './../index';

const TriviaLayout: React.FC<any> = props => {
  return (
    <ScrollView contentContainerStyle={[styles.trivia]}>
      <Text style={[styles.title]}>{props.trivia.questions[0].title}</Text>
      <InlineWebview
        html={props.trivia.questions[0].description}
        style={[styles.inlineWebview]}
      />
      {props.state.loading && <ActivityIndicator size="large" />}
      {!props.state.answered &&
        props.trivia.questions[0].answers.map((answer: any, i: number) => (
          <TouchableOpacity
            key={answer.id}
            onPress={() => props.selectOption(answer)}
            style={{marginBottom: 16}}>
            <View
              style={[
                styles.responseOption,
                props.state.selectedOption === answer.id &&
                  styles.responseSelectedOption,
              ]}>
              <Text style={[styles.responseOptionTitle]}>Opción {i + 1}</Text>
              <InlineWebview html={answer.title} />
            </View>
          </TouchableOpacity>
        ))}
      {!props.state.answered && (
        <Button
          style={[
            styles.button,
            props.state.selectedOption && {backgroundColor: '#39b3e2'},
          ]}
          onPress={props.saveAnswer}
          disabled={!props.state.selectedOption}
          rounded
          block>
          <Text style={[styles.buttonText]}>Ver respuesta</Text>
        </Button>
      )}

      {!props.state.loading && props.state.answered && (
        <React.Fragment>
          <View
            style={[
              styles.responseOption,
              {
                backgroundColor: '#e6ffd9',
                borderColor: '#e6ffd9',
              },
            ]}>
            <Text
              style={[
                styles.responseOptionTitle,
                {color: '#66a249', alignSelf: 'center'},
              ]}>
              Respuesta correcta
            </Text>
            <InlineWebview html={props.state.correctAnswer.comment} />
          </View>
          <Text
            style={[
              styles.responseOptionTitle,
              {textAlign: 'center', marginBottom: 16, fontSize: 18},
            ]}>
            La próxima trivia estará disponible mañana
          </Text>
          <View style={[{alignItems: 'center'}]}>
            <Image
              source={require('assets/img/brain_lg.png')}
              style={[{width: 80}]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.responseOptionTitle,
                {fontSize: 64, marginTop: -24},
                props.state.correct && {color: '#66a249'},
                !props.state.correct && {color: '#e94044'},
              ]}>
              {props.state.brains > 0 && '+'}
              {props.state.brains}
            </Text>
          </View>
          <Button
            style={[styles.button, {backgroundColor: '#e94044'}]}
            onPress={() => props.navigation.goBack()}
            rounded
            block>
            <Text style={[styles.buttonText]}>Salir</Text>
          </Button>
        </React.Fragment>
      )}
      {props.state.correct && <React.Fragment />}
    </ScrollView>
  );
};

export default React.memo(TriviaLayout);
