import React from 'react';
import {View, ScrollView, TextInput} from 'react-native';
import {Text, Button, Icon} from 'native-base';

import {styles} from 'app_components/screens/train-your-mind';
import gameStyles from './styles'

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
                <Icon type="FontAwesome" name="check" style={[styles.feedBackIcon, { color: '#7aab62' }]} />
              </View>
            )}

            {props.answered && props.answered !== props?.question?.answer && (
              <View style={[styles.feedBackIconContainer, { borderColor: '#e94044' }]}>
                <Icon type="FontAwesome" name="close" style={[styles.feedBackIcon, { color: '#e94044' }]} />
              </View>
            )}

            <Text style={[styles.gameTitle, gameStyles.word]}>
              {!props.answered && props?.question?.question}
              {props.answered && props?.question?.question.replace('_', props.answered)}
            </Text>

            <View style={{flexDirection: 'row', marginBottom: 32}}>
              {props.question?.options.map((option: string) => (
                <Button
                  key={option}
                  style={[
                    {marginLeft: 16, paddingHorizontal: 16},
                    props.answered &&
                    props?.question?.answer === option &&
                    { backgroundColor: '#8ec772' },
                    props.answered &&
                    props?.question?.answer !== option &&
                    { backgroundColor: '#e94044' }
                  ]}
                  onPress={() => props.doAnswer(option)}
                  large
                  rounded
                >
                  <Text>{option}</Text>
                </Button>
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
