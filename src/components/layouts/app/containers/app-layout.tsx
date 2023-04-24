import React from 'react';
import {connect} from 'react-redux';
import {View, Image} from 'react-native';
import { DrawerHeaderProps, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Header from '../../../commons/header/containers/header';
import HomeScreen from '../../../../components/screens/home/containers/home';
import SimulacrumScreen from '../../../../components/screens/simulacrum/containers/simulacrum';
import DrawerMenu from '../../../screens/drawer-menu/containers/drawer-menu';
import ProfileScreen from '../../../screens/profile';
import TrainYourMind from '../../../screens/train-your-mind/containers/tym';
import ChallengeScreen from '../../../screens/challenge/containers/challenge';
import TipsScreen from '../../../screens/tips/containers/tips';
import SectionsMatterScreen from '../../../screens/sections-matter/containers/SectionsMatterContainer';
import ChallengeQuestionScreen from '../../../screens/challenge-questions/containers/challenge-questions';
import LearningPathScreen from '../../../screens/learning-path/containers/learning-path';
import ChallengeResultsScreen from '../../../screens/challenge-results/components/challenge-results';
import SimulacrumQuestionScreen from '../../../screens/simulacrum-question/containers/simulacrum-question';
import RecoverLivesScreen from '../../../screens/recover-lives/containers/recover-lives';
import TriviaScreen from '../../../screens/trivia';
import AboutScreen from '../../../screens/about';
import TipScreen from '../../../screens/tips/containers/tip';
import SimulacrumScore from '../../../screens/simulacrum-score';
import TrainYourMindScreen, {
  TrainYourMindInstructionsLayout,
  TrainYourMindResultsLayout,
  SudokuLayout,
  SpellItLayout,
  ProblemsLayout,
  MemoryLayout,
} from '../../../screens/train-your-mind';


const Drawer = createDrawerNavigator();

const AppLayout = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerMenu {...props} />}
        screenOptions={{
          header : (headerParams: DrawerHeaderProps) => {
            const navigation = headerParams?.navigation;
            const previous = headerParams?.route?.name === 'Home' ? false : true;
            const title = (headerParams?.route?.name && headerParams?.route?.name !== 'Home') || <Image source={require('../../../../assets/img/logo_iq.png')} />;
            const plain = headerParams?.route?.params?.headerPlain;
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
          }
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{headerPlain: true}}
        />
        <Drawer.Screen
          name="Challenges"
          component={ChallengeScreen}
          options={{title: 'Retos'}}
        />
        <Drawer.Screen 
          name="Simulacrums"
          component={SimulacrumScreen}
          options={{title: 'Simulacros'}}
        />
        <Drawer.Screen
          name="Tips"
          component={TipsScreen}
          options={{title: 'Noticias'}}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: 'Perfil'}}
          initialParams={{
            headerPlain: true,
            rightButton: <View />,
          }}
        />
        <Drawer.Screen
          name="Train-your-mind"
          component={TrainYourMind}
          options={{title: 'Entrena tu mente'}}
        />


        <Drawer.Screen
          name="Train-your-mind"
          component={TrainYourMindScreen}
          options={{title: 'Entrena tu mente'}}
        />
        <Drawer.Screen
          name="Train-your-mind/instructions"
          component={TrainYourMindInstructionsLayout}
        />
        <Drawer.Screen
          name="Train-your-mind/results"
          component={TrainYourMindResultsLayout}
          initialParams={{leftButton: <View />}}
        />
        <Drawer.Screen name="Train-your-mind/sudoku" component={SudokuLayout} />
        <Drawer.Screen name="Train-your-mind/spellIt" component={SpellItLayout} />
        <Drawer.Screen
          name="Train-your-mind/problemSolving"
          component={ProblemsLayout}
        />
        <Drawer.Screen name="Train-your-mind/memory" component={MemoryLayout} />


        <Drawer.Screen
          name="ChallengeQuestion"
          component={ChallengeQuestionScreen}
          options={{title: 'Retos'}}
        />

        <Drawer.Screen
          name="SectionsMatter"
          component={SectionsMatterScreen}
          options={{title: 'Secciones'}}
        />

        <Drawer.Screen
          name="SectionsSimulacrum"
          component={SectionsMatterScreen}
          options={{ title: 'Secciones' }}
        />

        <Drawer.Screen
          name="LearningPath"
          component={LearningPathScreen}
          options={{title: 'Retos'}}
        />
        <Drawer.Screen
          name="SimulacrumScore"
          component={SimulacrumScore}
          options={{title: 'Simulacros'}}
        />
        <Drawer.Screen
          name="SimulacrumQuestion"
          component={SimulacrumQuestionScreen}
          options={{title: 'Simulacros'}}
        />
        <Drawer.Screen
          name="RecoverLivesScreen"
          component={RecoverLivesScreen}
          options={{title: 'Simulacros'}}
        />
        <Drawer.Screen
          name="ChallengeResults"
          component={ChallengeResultsScreen}
          options={{title: 'Resultados'}}
        />
        <Drawer.Screen
          name="Tips"
          component={TipsScreen}
          options={{title: 'Noticias'}}
        />
        <Drawer.Screen
          name="Tip"
          component={TipScreen}
          options={{title: 'Noticias'}}
        />
        <Drawer.Screen
          name="TriviaScreen"
          component={TriviaScreen}
          options={{title: 'Trivia'}}
        />
        <Drawer.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{title: 'Acerca de'}}
          initialParams={{headerPlain: true}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )

}

export default connect(null)(AppLayout);
