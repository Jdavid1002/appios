import React from 'react';
import {Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Header from 'app_components/commons/header/containers/header';
import HomeScreen from 'app_components/screens/home/containers/home';
import ChallengeScreen from 'app_components/screens/challenge/containers/challenge';
import SectionsMatterScreen from 'app_components/screens/sections-matter/containers/SectionsMatterContainer';
import TrainYourMindScreen, {
  TrainYourMindInstructionsLayout,
  TrainYourMindResultsLayout,
  SudokuLayout,
  SpellItLayout,
  ProblemsLayout,
  MemoryLayout,
} from 'app_components/screens/train-your-mind';
import SimulacrumScreen from 'app_components/screens/simulacrum/containers/simulacrum';
import ProfileScreen from 'app_components/screens/profile/containers/profile';
import ChallengeQuestionScreen from 'app_components/screens/challenge-questions/containers/challenge-questions';
import LearningPathScreen from 'app_components/screens/learning-path/containers/learning-path';
import ChallengeResultsScreen from 'app_components/screens/challenge-results/components/challenge-results';
import SimulacrumQuestionScreen from 'app_components/screens/simulacrum-question/containers/simulacrum-question';
import RecoverLivesScreen from 'app_components/screens/recover-lives/containers/recover-lives';
import TriviaScreen from 'app_components/screens/trivia';
import AboutScreen from 'app_components/screens/about';
import TipsScreen from 'app_components/screens/tips/containers/tips';
import TipScreen from 'app_components/screens/tips/containers/tip';
import SimulacrumScore from 'app_components/screens/simulacrum-score';

const Stack = createStackNavigator();

export const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        header: ({scene, navigation, previous}: any) => {
          const {options} = scene.descriptor;

          const params = scene.route.params;

          let title: React.ReactNode = options.title;

          if (typeof params?.headerTitle !== 'undefined') {
            title = params.headerTitle.toString();
          }

          if (typeof title === 'undefined') {
            title = <Image source={require('assets/img/logo_iq.png')} />;
          }

          return (
            <Header
              title={title}
              subtitle={params?.subtitle}
              leftButton={params?.leftButton}
              rightButton={params?.rightButton}
              plain={params?.headerPlain}
              navigation={navigation}
              previous={previous}
            />
          );

          // if (typeof scene === 'object') {
          //   if (scene.hasOwnProperty('route')) {
          //     if (
          //       scene.route.hasOwnProperty('params') &&
          //       typeof scene.route.params !== 'undefined'
          //     ) {
          //       if (typeof scene.route.params.headerTitle !== 'undefined') {
          //         title = scene.route.params.headerTitle.toString();
          //       }
          //     }
          //   }
          // }
          // if (title && typeof title !== undefined) {
          //   return (
          //     <Header
          //       onPressIcon={() => navigation.toggleDrawer()}
          //       leftIcon={
          //         <FontAwesomeIcon icon={faBars} color={'#24ABDF'} size={36} />
          //       }>
          //       <CustomText style={mainStyles.headerText}> {title} </CustomText>
          //     </Header>
          //   );
          // }
          // return (
          //   <Header
          //     onPressIcon={() => navigation.toggleDrawer()}
          //     leftIcon={
          //       <FontAwesomeIcon icon={faBars} color={'#24ABDF'} size={36} />
          //     }>
          //     <Image source={require('assets/img/logo_iq.png')} />
          //   </Header>
          // );
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{headerPlain: true}}
      />
      <Stack.Screen
        name="Simulacrums"
        component={SimulacrumScreen}
        options={{title: 'Simulacros'}}
      />
      <Stack.Screen
        name="Train-your-mind"
        component={TrainYourMindScreen}
        options={{title: 'Entrena tu mente'}}
      />
      <Stack.Screen
        name="Train-your-mind/instructions"
        component={TrainYourMindInstructionsLayout}
      />
      <Stack.Screen
        name="Train-your-mind/results"
        component={TrainYourMindResultsLayout}
        initialParams={{leftButton: <View />}}
      />
      <Stack.Screen name="Train-your-mind/sudoku" component={SudokuLayout} />
      <Stack.Screen name="Train-your-mind/spellIt" component={SpellItLayout} />
      <Stack.Screen
        name="Train-your-mind/problemSolving"
        component={ProblemsLayout}
      />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <Stack.Screen name="Train-your-mind/memory" component={MemoryLayout} />
      <Stack.Screen
        name="Challenges"
        component={ChallengeScreen}
        options={{title: 'Retos'}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'Perfil'}}
        initialParams={{
          headerPlain: true,
          rightButton: <View />,
        }}
      />
      <Stack.Screen
        name="ChallengeQuestion"
        component={ChallengeQuestionScreen}
        options={{title: 'Retos'}}
      />

      <Stack.Screen
        name="SectionsMatter"
        component={SectionsMatterScreen}
        options={{title: 'Secciones'}}
      />

      <Stack.Screen
        name="SectionsSimulacrum"
        component={SectionsMatterScreen}
        options={{ title: 'Secciones' }}
      />

      <Stack.Screen
        name="LearningPath"
        component={LearningPathScreen}
        options={{title: 'Retos'}}
      />
      <Stack.Screen
        name="SimulacrumScore"
        component={SimulacrumScore}
        options={{title: 'Simulacros'}}
      />
      <Stack.Screen
        name="SimulacrumQuestion"
        component={SimulacrumQuestionScreen}
        options={{title: 'Simulacros'}}
      />
      <Stack.Screen
        name="RecoverLivesScreen"
        component={RecoverLivesScreen}
        options={{title: 'Simulacros'}}
      />
      <Stack.Screen
        name="ChallengeResults"
        component={ChallengeResultsScreen}
        options={{title: 'Resultados'}}
      />
      <Stack.Screen
        name="Tips"
        component={TipsScreen}
        options={{title: 'Noticias'}}
      />
      <Stack.Screen
        name="Tip"
        component={TipScreen}
        options={{title: 'Noticias'}}
      />
      <Stack.Screen
        name="TriviaScreen"
        component={TriviaScreen}
        options={{title: 'Trivia'}}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{title: 'Acerca de'}}
        initialParams={{headerPlain: true}}
      />
    </Stack.Navigator>
  );
};
