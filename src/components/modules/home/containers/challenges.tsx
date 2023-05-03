import React, {Component} from 'react';
import {View, FlatList, Alert, ActivityIndicator} from 'react-native';

import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import ChallengeCard from '../../../../components/modules/challenge-card/components/challenge-card-simple';

import styles from '../styles/styles-challenges';
import mainStyles from '../../../../styles/MainStyles';

import {connect} from 'react-redux';
import ChallengeService from '../../../../services/challenges/challenges';

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state?.auth?.user?.token,
    user_id: state?.auth?.user?._id,
    alliance_id: state?.auth?.user?.alliance_id,
  };
}

class ChallengesContainer extends Component<any> {
  state = {loading: false, matters: []};

  renderEmpty = () => <CustomText> No hay retos para mostrar </CustomText>;
  renderItem = ({item}: any = {}) => <ChallengeCard {...item} />;
  keyExtractor = (item: any = {}) => item.id.toString();
  itemSeparator = () => <CustomText />;

  componentDidMount = () => {
    this.getChallengesData();
    //@INFO En react native el renderizado se cancela cuando se vuelve de una pantalla a otra, esta funcionalidad lo que hace es que escucha cada que haya un cambio en la navegacion en la que el este involucrado (este componente se muestre en esa vista) y envia la funcion de getChallengesData.
    this.props.navigation.addListener('focus', () => {
      this.getChallengesData();
    });
  };

  handlePress = (matterId: number) => {
    const matter_data: any = this.state.matters.find(
      (m: any) => m.id === matterId,
    );
    if (!matter_data) {
      return;
    }

    if (!matter_data?.isDiagnostic) {
      this.props.navigation.navigate('LearningPath', {matterId: matterId});
      return false;
    }

    this.props.navigation.navigate('SectionsMatter', {
      matterId: matterId,
      configCategory: '6303ed5f3138387a1669d7ac',
      getChallengesData: this.getChallengesData,
    });
  };

  async getChallengesData() {
    this?.setState({loading: true});
    const challengeService = new ChallengeService();

    const data = await challengeService.getChallengesData({
      auth_token: this.props.auth_token,
      alliance_id: this.props.alliance_id,
      user_id: this.props.user_id,
    });

    if (data?.code === 200) {
      const images: any = {
        Matemáticas: require('assets/img/challenge/card_matematicas.png'),
        'Lengua Española': require('assets/img/challenge/card_lenguaje.png'),
        'Ciencias Sociales': require('assets/img/challenge/card_sociales.png'),
        'Ciencias de la Naturaleza': require('assets/img/challenge/card_ciencias.png'),
      };

      const matters = data?.home_data?.learning_ways?.length
        ? data?.home_data?.learning_ways
        : data?.home_data?.diagnostics;

      const matter_data = matters?.map((item: any, idx: number) => {
        const itemLearningWays = data?.home_data?.learning_ways[idx];
        const isDiagnostic = !itemLearningWays ? true : false;

        item = !item?.statistics?.diagnostic_attempts_available
          ? item
          : itemLearningWays
          ? itemLearningWays
          : item;
        const isGenerateLearningWay = this.canResultsWhenIsDiagnostic(
          item?.statistics?.results,
          'is_generating',
        );

        return {
          id: item?._id,
          title: item?.name,
          color: item?.config?.color,
          progress: item?.statistics?.completed_status
            ? Math.round(item?.statistics?.completed_status)
            : 0,
          brains_can_get: item?.brains_can_get || 3000,
          imageLeft: images[item?.name],
          onPress: isGenerateLearningWay ? () => null : this?.handlePress,
          isDiagnostic: isDiagnostic && !isGenerateLearningWay ? true : false,
          loading: isGenerateLearningWay,
          getChallengesData: this.getChallengesData,
        };
      });

      this.setState({
        loading: false,
        matters: matter_data,
      });
    } else {
      Alert.alert(data.message);
    }
  }

  canResultsWhenIsDiagnostic = (
    results_statistics: any | undefined,
    case_key: string,
  ): boolean => {
    if (results_statistics) {
      if (results_statistics.status && results_statistics?.status !== 'ended') {
        return false;
      }
      if (
        !Object(results_statistics).hasOwnProperty('generated_route') &&
        !Object(results_statistics).hasOwnProperty('generating_route') &&
        !Object(results_statistics).hasOwnProperty('perfect_route')
      ) {
        return false;
      }
      const {generated_route, generating_route, perfect_route} =
        results_statistics;
      if (case_key === 'is_generating') {
        if (generating_route && !generated_route && !perfect_route) {
          return true;
        }
      }
      if (case_key === 'cant_generate') {
        if (!generating_route && !generated_route && !perfect_route) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      );
    }

    return (
      <View>
        <CustomText style={[mainStyles.textCenter, styles.textTitle]}>
          ¿Qué quieres estudiar hoy?
        </CustomText>
        <CustomText style={[styles.textSubTitle]}>Retos</CustomText>
        <CustomText />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.matters}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.itemSeparator}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default connect(mapStatesToProps)(ChallengesContainer);
