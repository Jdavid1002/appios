import React, {Component} from 'react';
import {
  ScrollView,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {CustomText} from 'app_components/commons/customs/components/customComponents';
import ChallengeCard from 'app_components/modules/challenge-card/components/challenge-card';
import styles from '../styles/styles';
import mainStyles from 'app_styles/MainStyles';

import {connect} from 'react-redux';
import {Http, HttpCustomStructure} from 'app_utils/http';

import HowIFeel from 'app_components/commons/how-i-feel';
import ChallengeService from 'app_services/challenges/challenges';

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state?.auth?.user?.token,
    user_id: state?.auth?.user?._id,
    alliance_id: state?.auth?.user?.alliance_id,  };
}

class Challenges extends Component<any> {
  state = {loading: false, auth_token: null, matters: []};

  renderEmpty = () => <CustomText> No hay retos para mostrar </CustomText>;
  renderItem = ({item}: any = {}) => <ChallengeCard {...item} />;
  keyExtractor = (item: any = {}) => item.id.toString();
  itemSeparator = () => <CustomText />;

  componentDidMount = () => {
    this.getChallengesData();
  };

  handlePress = (matterId: number) => {
    const matter_data: any = this.state.matters.filter(
      (m: any) => m.id === matterId,
    );
    if (matter_data[0]) {
      if (parseInt(matter_data[0].progress) >= 100) {
        this.props.navigation.navigate('LearningPath', {matterId: matterId});
        return false;
      }
    }
    this.props.navigation.navigate('ChallengeQuestion', {matterId: matterId});
  };

  async getChallengesData() {
    this.setState({loading: true});

    const challengeService = new ChallengeService()

    const data = await challengeService.getChallengesData({
      auth_token : this.props.auth_token,
      alliance_id : this.props.alliance_id,
      user_id : this.props.user_id
    })


    if (data?.status === 'success') {
      const images : any = {
        'Matemáticas': 'http://uploads.kuepa.com/uploads/app-matters/53281/card_large.png',
        'Lengua Española': 'http://uploads.kuepa.com/uploads/app-matters/53275/card_large.png',
        'Ciencias Sociales': 'http://uploads.kuepa.com/uploads/app-matters/53298/card_large.png',
        'Ciencias de la Naturaleza': 'http://uploads.kuepa.com/uploads/app-matters/53288/card_large.png',
      }

      const matters = data?.home_data?.learning_ways?.length ? data?.home_data?.learning_ways : data?.home_data?.diagnostics
      const matter_data = matters?.map((item : any, idx : number) => {

        const itemLearningWays = data?.home_data?.learning_ways[idx]
        const isDiagnostic = !itemLearningWays ? true : false

        item = !item?.statistics?.diagnostic_attempts_available ? item : itemLearningWays ? itemLearningWays : item
        const isGenerateLearningWay = this.canResultsWhenIsDiagnostic(item?.statistics?.results, 'is_generating')

        return {
          id: item?._id,
          title: item?.name,
          color: item?.config?.color,
          progress: item?.statistics?.completed_status ? Math.round(item?.statistics?.completed_status) : 0,
          brains_can_get: item?.brains_can_get || 0,
          backgroundImage : images[item?.name],
          onPress: isGenerateLearningWay ? () => null :this?.handlePress,
          isDiagnostic : isDiagnostic && !isGenerateLearningWay ? true : false,
          loading : isGenerateLearningWay,
          getChallengesData : this.getChallengesData
        }
      });

      this.setState({
        loading: false,
        matters: matter_data,
      });
    } else {
      Alert.alert(data.message);
    }
  }

  canResultsWhenIsDiagnostic = (results_statistics: any | undefined, case_key: string ): boolean => {
    if (results_statistics) {
      if(results_statistics.status && results_statistics?.status!=="ended") return false
      if (!Object(results_statistics).hasOwnProperty('generated_route')
        && !Object(results_statistics).hasOwnProperty('generating_route')
        && !Object(results_statistics).hasOwnProperty('perfect_route')
      ) return false
      const { generated_route, generating_route, perfect_route } = results_statistics
      if (case_key === 'is_generating') {
        if (generating_route && !generated_route && !perfect_route) return true
      } if (case_key === 'cant_generate') {
        if (!generating_route && !generated_route && !perfect_route) return true
      }
      return false
    } else {
      return false
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <ScrollView style={[mainStyles.container]}>
          <ActivityIndicator size="large" color="#061946" />
        </ScrollView>
      );
    }

    return (
      <React.Fragment>
        <ScrollView style={[mainStyles.container]}>
          <CustomText style={styles.title}> Retos del día </CustomText>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.matters}
            ListEmptyComponent={this.renderEmpty}
            ItemSeparatorComponent={this.itemSeparator}
            renderItem={this.renderItem}
          />
          <View style={mainStyles.marginBottom80} />
        </ScrollView>
        <HowIFeel screen="section_challenge_page" />
      </React.Fragment>
    );
  }
}

export default connect(mapStatesToProps)(Challenges);
