import React from 'react';
import {ScrollView, View, Image, Text, TouchableHighlight} from 'react-native';

import {styles} from '../../../../components/screens/train-your-mind';

const InstructionsLayout = (props: any) => {
  const params: any = props.route.params;
  return (
    <View style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[
          styles.wrapper,
          {paddingHorizontal: 20, paddingTop: 20},
        ]}>
        <Text style={[styles.gameTitle]}>{params.data.name}</Text>

        <Image
          style={[
            styles.gameImage,
            params.data.key === 'spellIt' && {width: 160, maxWidth: '100%'},
          ]}
          source={params.data.image}
          resizeMode="contain"
        />

        {typeof params.data.instructions === 'string' && (
          <Text
            style={[
              styles.text,
              styles.instructionStepText,
              {textAlign: 'center'},
            ]}>
            {params.data.instructions}
          </Text>
        )}
        {typeof params.data.instructions === 'object' &&
          params.data.instructions.map((item: string, i: number) => (
            <View key={i} style={[styles.instructionStep]}>
              <Text style={[styles.text, styles.instructionStepTitle]}>
                Regla {i + 1}
              </Text>
              <Text style={[styles.text, styles.instructionStepText]}>
                {item}
              </Text>
            </View>
          ))}
        {params.data.time && (
          <Text
            style={[
              styles.text,
              {fontSize: 32, fontWeight: '700', marginVertical: 24},
            ]}>
            Tienes {params.data.time / 60} minuto(s).
          </Text>
        )}
        <TouchableHighlight
          style={[styles.button]}
          onPress={() =>
            props.navigation.navigate(`Train-your-mind/${params.data.key}`)
          }
          // rounded
          // block
          >
          <Text>Jugar</Text>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
};

export default InstructionsLayout;
