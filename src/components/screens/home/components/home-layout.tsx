/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Challenges from '../../../../components/modules/home/containers/challenges';
import SimulacrumCard from '../../../../components/modules/simulacum/containers/card-home';
import TrainYourMindHome from '../../../../components/screens/train-your-mind/containers/tym-home';
import HowIFeel from '../../../../components/commons/how-i-feel';
import TriviaCard from '../../../../components/modules/trivia-card';
import DailyQuestionCard from '../../../../components/modules/daily-question-card';
import { TipsHomeCard } from '../../../../components/modules/tips';

import mainStyles from '../../../../styles/MainStyles';
import SimulacrumService from '../../../../services/simulacrum/simulacrum';

function HomeLayout(props: any) {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);

  let simulacrum_data = useSelector(state =>
    state.simulacrum && state.simulacrum.data ? state.simulacrum.data : null
  );

  let auth_token = useSelector(state =>
    state.auth && state.auth.user && state.auth.user.token
      ? state.auth.user.token
      : null
  );

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const getSimulacrumData = async () => {
    if (simulacrum_data) {
      if (
        typeof simulacrum_data.lives !== 'undefined' &&
        simulacrum_data.lives < 3
      ) {
        const simulacrum_service = new SimulacrumService();
        if (simulacrum_data.time) {
          if (typeof simulacrum_data.time === 'string') {
            simulacrum_data.time = new Date(simulacrum_data.time);
          }
          let time = new Date();
          const diff = Math.abs(
            (simulacrum_data.time.getTime() - time.getTime()) / 1000
          );
          const minutes = Math.floor(diff / 60);
          if (minutes >= 15) {
            simulacrum_service.checkRecoverLives(auth_token, dispatch);
          }
        } else {
          simulacrum_service.checkRecoverLives(auth_token, dispatch);
        }
      }
    }
  };

  const updateData = async () => {
    setRefreshing(true);

    await getSimulacrumData();

    setRefreshing(false);
  };

  return (
    <React.Fragment>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={updateData} />
        }
      >
        <View
          style={[
            mainStyles.blueBackground,
            mainStyles.containerRadius,
            { marginBottom: 0 },
          ]}
        >
          <Challenges navigation={props.navigation} />
        </View>

        <View style={mainStyles.container}>
          <DailyQuestionCard />
          <SimulacrumCard navigation={props.navigation} />
          <TrainYourMindHome />
          <TriviaCard />
          <TipsHomeCard navigation={props.navigation} />
        </View>
      </ScrollView>
      <HowIFeel screen="section_home_page" />
    </React.Fragment>
  );
}

export default HomeLayout;
