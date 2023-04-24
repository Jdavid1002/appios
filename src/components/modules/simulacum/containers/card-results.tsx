import React, {Component} from 'react';
import {View, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import Bar from '../../../../components/commons/bars/components/bar-vertical';
import mainStyles from '../../../../styles/MainStyles';
import styles from '../styles/styles';

import {connect} from 'react-redux';

export interface ISimulacrumResult {
  average: number;
  color: string;
  id: number;
  name: string;
  total_score: number;
  total_simulacrums: number;
}

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
  };
}

interface ICardResultProps {
  resultsData: ISimulacrumResult[];
}

interface ICardResultState {
  loading: boolean;
  brains: number;
  results_data: ISimulacrumResult[];
}

class CardResults extends Component<ICardResultProps, ICardResultState> {
  state = {
    loading: true,
    brains: 0,
    results_data: [],
  };

  componentDidMount = () => {
    this.setState({
      loading: true,
      brains: 0,
      results_data: [],
    });
    this.getResultsData();
  };

  getResultsData = async () => {
    this.setState({
      loading: false,
      brains: 0,
      results_data: this.props.resultsData,
    });
  };

  renderEmpty = () => (
    <CustomText> No hay información para mostrar </CustomText>
  );
  renderItemLabels = ({item}: any = {}) => {
    return (
      <CustomText style={{marginLeft: 10}}>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 50,
            backgroundColor: item.color,
          }}
        />
        <CustomText
          style={{color: '#061946', fontSize: 10, fontWeight: 'bold'}}>
          &nbsp;&nbsp;{item.name}{' '}
        </CustomText>
      </CustomText>
    );
  };

  renderItemBars = ({item}: any = {}) => (
    <Bar color={item.color} progress={item.average} displayValue={true} />
  );
  keyExtractor = (item: any = {}) => item.id.toString();
  itemSeparator = () => <CustomText />;

  render() {
    if (this.state.loading) {
      return (
        <View style={[mainStyles.container]}>
          <ActivityIndicator size="large" color="#061946" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('assets/img/background_simulacrums.png')}
          style={styles.background}>
          <View style={styles.wrapper}>
            <View style={styles.titleWrapper}>
              {/* <CustomText style={styles.title}>
                Has acumulado {this.state.brains}{' '}
                <Image source={require('assets/img/brain.png')} /> en
                Simulacros.
              </CustomText> */}
              <CustomText />
              <CustomText style={styles.subtitle}>
                En la siguiente gráfica podrás ver la nota promedio que has
                obtenido por cada asignatura dentro de la APP.
              </CustomText>
            </View>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.labelContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.results_data}
                ListEmptyComponent={this.renderEmpty}
                ItemSeparatorComponent={this.itemSeparator}
                renderItem={this.renderItemLabels}
              />
            </View>
            <View style={styles.chartContainer}>
              <FlatList
                horizontal={true}
                keyExtractor={this.keyExtractor}
                data={this.state.results_data}
                ListEmptyComponent={this.renderEmpty}
                ItemSeparatorComponent={this.itemSeparator}
                renderItem={this.renderItemBars}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default connect(mapStatesToProps)(CardResults);
