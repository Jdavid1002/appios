import React from 'react';
import {Image, View} from 'react-native';
import {StackHeaderProps, createStackNavigator} from '@react-navigation/stack';
import Header from '../../components/commons/header/containers/header';
import HomeScreen from '../../components/screens/home/containers/home';
import ChallengeScreen from '../../components/screens/challenge/containers/challenge';
import SectionsMatterScreen from '../../components/screens/sections-matter/containers/SectionsMatterContainer';
import TrainYourMindScreen, {
  TrainYourMindInstructionsLayout,
  TrainYourMindResultsLayout,
  SudokuLayout,
  SpellItLayout,
  ProblemsLayout,
  MemoryLayout,
} from '../../components/screens/train-your-mind';
import SimulacrumScreen from '../../components/screens/simulacrum/containers/simulacrum';
import ProfileScreen from '../../components/screens/profile/containers/profile';
import ChallengeQuestionScreen from '../../components/screens/challenge-questions/containers/challenge-questions';
import LearningPathScreen from '../../components/screens/learning-path/containers/learning-path';
import ChallengeResultsScreen from '../../components/screens/challenge-results/components/challenge-results';
import SimulacrumQuestionScreen from '../../components/screens/simulacrum-question/containers/simulacrum-question';
import RecoverLivesScreen from '../../components/screens/recover-lives/containers/recover-lives';
import TriviaScreen from '../../components/screens/trivia';
import AboutScreen from '../../components/screens/about';
import TipsScreen from '../../components/screens/tips/containers/tips';
import TipScreen from '../../components/screens/tips/containers/tip';
import SimulacrumScore from '../../components/screens/simulacrum-score';

const Stack = createStackNavigator();

export const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (headerParams: StackHeaderProps) => {
          const navigation = headerParams?.navigation;
          const previous = headerParams?.progress?.previous
          const title = (headerParams?.route?.name && headerParams?.route?.name !== 'Home') || <Image source={require('../../assets/img/logo_iq.png')} />;
          const plain = (headerParams?.route?.params?.headerPlain && headerParams?.route?.name !== 'Home') || false;

          return (
            <Header
              title={title}
              leftButton={false}
              rightButton={false}
              plain={plain}
              navigation={navigation}
              previous={previous}
            />
          );
        },
      }}
    >
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
