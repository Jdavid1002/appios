import React from 'react';
import {ScrollView} from 'react-native';
import Results from 'app_components/commons/exercise-results/containers/results';
import mainStyles from 'app_styles/MainStyles';

function ChallengeResults (props: any){
  return (
    <ScrollView style={[mainStyles.container]}>
      <Results {...props}/>
    </ScrollView>
  );
}

export default ChallengeResults;
