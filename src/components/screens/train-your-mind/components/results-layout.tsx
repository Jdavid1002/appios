import React from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Image, BackHandler, Text, TouchableHighlight} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import GameService from '../../../../services/games';
import {styles} from '../../../../components/screens/train-your-mind';
import HowIFeelService from '../../../../services/how-i-feel';

const ResultsLayout = (props: any) => {
  const [state, setState] = React.useState<any>(null)

  const navigation = useNavigation();
  const params: any = props.route.params;

  const saveGame = async () => {
    const gameService = new GameService();
    const howIFeelService = new HowIFeelService();

    let time_view: number = 60;

    if (params.key !== 'sudoku') {
      time_view = 60 - params.time_view;
    } else {
      time_view = params.time_view;
    }

    const results: any = await gameService.saveGameGamification(params.corrected_answers, props?.statistics, props.dispatch)

    const dataResults: any = { brains_to_assign: Number(results.totalPoints), corrected_answers: Number(params.corrected_answers) }

    setState(dataResults);
    howIFeelService.setIsActive(props.dispatch, true);
  }


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Train-your-mind');
        return true;
      };

      saveGame();

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <View style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[
          styles.wrapper,
          {paddingHorizontal: 20, paddingTop: 20},
        ]}>
        <Text style={[styles.gameTitle]}>Resultados</Text>

        <Image
          style={[styles.gameImage]}
          source={require('assets/img/brain_lg.png')}
          resizeMode="contain"
        />

        <Text style={[styles.gameTitle, {fontSize: 48, color: '#8ec772'}]}>
          {state?.brains_to_assign > 0 && '+'}
          {state?.brains_to_assign}
        </Text>

        {params?.details.map((row: any) => (
          <View
            key={row?.key}
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 20,
              },
            ]}>
            {row?.key && (
              <Text
                style={[
                  styles.text,
                  {color: '#061946', fontFamily: 'Nunito-Bold', flexGrow: 1},
                ]}>
                {row?.key}:
              </Text>
            )}
            {row?.value && (
              <Text style={[styles.text, {color: '#39b3e2'}]}>
                {row?.value}
              </Text>
            )}
          </View>
        ))}

        <TouchableHighlight
          style={[styles.button, {backgroundColor: '#e94044'}]}
          onPress={() => props.navigation.navigate('Train-your-mind')}
        >
          <Text>Salir</Text>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
};

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
    statistics: state.statistics.data,
  };
}

export default connect(mapStatesToProps)(ResultsLayout);

