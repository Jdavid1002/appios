import React, { Component } from 'react';
import {
  ScrollView,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import SimulacrumCard from '../../../../components/modules/challenge-card/components/card-large';
import CardResults, { ISimulacrumResult } from '../../../../components/modules/simulacum/containers/card-results';
import { CustomText } from '../../../../components/commons/customs/components/customComponents';
import styles from '../styles/styles';
import mainStyles from '../../../../styles/MainStyles';
import HowIFeel from '../../../../components/commons/how-i-feel';

import { connect } from 'react-redux';
import { store } from '../../../../storage/redux-storage';
import SimulacrumService from '../../../../services/simulacrum/simulacrum';
import ModalLives from '../../../../components/commons/question/components/modal-lives';
import { updateLives } from '../../../../reducers/auth/actions';

interface ISimulacrumState {
  loading: boolean,
  matters_data: ISimulacrumData[],
  currentLevel: string,
  levels: any[]
  results_data: ISimulacrumResult[],
  show_lives_modal: boolean
}

interface ISimulacrumData {
  id: string,
  name: string,
  background: string,
  color: string,
}

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
    alliance_id: state.auth.user.alliance_id,
    lives: state.auth.user.lives
  };
}

class Simulacrums extends Component<any, ISimulacrumState> {
  private simulacrumService = new SimulacrumService()

  state = {
    loading: true,
    matters_data: [],
    currentLevel: '',
    levels: [],
    results_data: [],
    show_lives_modal: false
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    this.getLevels()
  };

  getLevels = async () => {
    const user = store.getState().auth.user
    const structure_id = user?.user_data?.program?._id
    if (!user?._id) return
    const response = await this.simulacrumService.getFilterLevels({
      user: user._id,
      structure_id: structure_id,
      programByUser: false,
      is_diagnostic: false
    })
    if (response?.code === 200 && response?.levelsSimulacrums?.length) {
      let sessionLevel: any
      let levels: Array<any> = []
      if (response.levelsSimulacrums) {
        let found = response.levelsSimulacrums.some((_l: any) => _l?._id?.toString() === sessionLevel?._id?.toString())
        if (found) levels = [...[...response.levelsSimulacrums]]
        else levels = [...[sessionLevel], ...[...response.levelsSimulacrums]]
      }
      levels?.sort((a, b) => a.name?.localeCompare(b.name));
      this.setState({ levels: levels })

      if (!structure_id && response?.initialLevel && response.initialLevel?.toString() === sessionLevel?._id?.toString()) {
        sessionLevel = { _id: response.initialLevel }
      }

      await this.getMatterData(sessionLevel?._id)

    } else {
      this.setState({ levels: [] })
    }
  }

  handleChangeLevel = (_levelId: string | undefined, _level?: any, _levels?: any[]) => {
    if (_levelId) {
      if (!_level) {
        const _levelsList = _levels ? [..._levels] : [...this.state.levels]
        _level = _levelsList.find((_l) => _l._id === _levelId)
      }
      this.getMatterData(_levelId)
    }
  }

  public getLastAttemps = (_simulacrum: any, get_max_attempt?: boolean) => {
    let attempt = undefined
    if (get_max_attempt && _simulacrum?.max_attempt) {
      attempt = _simulacrum?.max_attempt ? _simulacrum?.max_attempt : undefined
    } else {
      attempt = _simulacrum?.attempts?.length ? _simulacrum?.attempts[_simulacrum?.attempts?.length - 1] : undefined
    }
    return attempt
  }

  getMatterData = async (_level: string) => {
    const user = store.getState().auth.user
    const structure_id = user?.user_data?.program?._id

    if (!structure_id || !user?._id) return
    const response = await this.simulacrumService.getSimulacrumsOrDiagnostics({
      user: user._id,
      structure_id: structure_id,
      level: _level,
      programByUser: true,
      is_diagnostic: false,
      status: { $in: ['started', 'ended'] }
    })
    if (response?.code === 200) {
      let matters_data: ISimulacrumData[] = [];
      let results_data: ISimulacrumResult[] = [];

      for (var i in response.simulacrums.simulacrums) {
        let score = 0
        if (response.simulacrums.simulacrums[i].attempts?.length) {
          if (response.simulacrums.simulacrums[i].attempts?.length > 1) {
            score = (response.simulacrums.simulacrums[i].attempts.reduce((acum: any, item:any) => {
              let count = acum
              if(item.results?.score){
                count += Number(item.results?.score)
              }
              return count
            }, 0)) / response.simulacrums.simulacrums[i].attempts?.length - 1
          } else {
            score = response.simulacrums.simulacrums[i].attempts[0].results?.score
          }
        }

        matters_data.push({
          id: response.simulacrums.simulacrums[i]._id,
          name: response.simulacrums.simulacrums[i].title,
          background: response.simulacrums.simulacrums[i].config.thumbnail,
          color: response.simulacrums.simulacrums[i].config.color,
        });
        results_data.push({
          average: Math.round(score),
          color: response.simulacrums.simulacrums[i].config?.color,
          id: response.simulacrums.simulacrums[i]._id,
          name: response.simulacrums.simulacrums[i].title,
          total_score: response.simulacrums.simulacrums[i].config?.totalPoints || 0,
          total_simulacrums: response.simulacrums.simulacrums[i].attempts?.length || 0
        })
      }
      this.setState({
        matters_data: matters_data,
        results_data: results_data,
        loading: false
      })
    } else {
      Alert.alert(
        'Error',
        'no se encontraron simulacros',
        [{ text: 'OK', onPress: () => this.props.navigation.navigate('Home') }],
        { cancelable: false },
      );
    }
    this.setState({});
  }

  goToSimulacrum = async (id: any) => {
    const lives = await this.simulacrumService.getLivesAvailable()
    if (lives.attempts === 0) {
      this.setState({ show_lives_modal: true })
    } else {
      this.props.navigation.navigate('SectionsSimulacrum', {
        customParams: { alliance: this?.props?.alliance_id, simulacrum: id },
        configCategory: '601981dcef21ba13c3843b88',
        isSimulacrum: true,
        matterId: id
      });
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={[mainStyles.container]}>
          <ActivityIndicator size="large" color="#061946" />
        </View>
      );
    }

    return (
      <React.Fragment>
        <ScrollView style={[mainStyles.container]}>
          <CustomText style={[styles.title]}>Simulacros</CustomText>
          <FlatList
            keyExtractor={(item: ISimulacrumData) => item.id}
            data={this.state.matters_data}
            renderItem={({ item }) => (
              <SimulacrumCard
                {...item}
                onPress={() => this.goToSimulacrum(item.id)}
              />
            )}
            numColumns={2}
          />
          <CustomText style={[styles.title, { marginTop: 30 }]}>
            Resultados de simulacros
          </CustomText>
          <CardResults resultsData={this.state.results_data} />
          <View style={mainStyles.marginBottom80} />
        </ScrollView>
        <HowIFeel screen="section_simulacrum" />
        <ModalLives
          animationType="slide"
          visible={this.state.show_lives_modal}
          onCloseModal={() => {
            this.setState({ show_lives_modal: false });
          }}
          transparent={true}
          lives={this.props.lives}
          presentationStyle="overFullScreen"
          onliInfo={true}
        />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateLives: (data: number) => dispatch(updateLives(data))
  }
}

export default connect(mapStatesToProps, mapDispatchToProps)(Simulacrums);
