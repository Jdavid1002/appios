import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import ButtonBlue from '../../../../components/commons/buttons/components/button-blue';
import ModalResults from './modal-results';

import {update as updateStatisticsAction} from '../../../../reducers/statistics/actions';

import {connect} from 'react-redux';

import styles from '../styles/styles';
import mainStyles from '../../../../styles/MainStyles';
import GeneralService from '../../../../services/general/general';
import HowIFeelService from '../../../../services/how-i-feel';

function mapStatesToProps(state: any = {}) {
  return {
    statistics: state.statistics.data,
  };
}

class ChallengeResults extends Component<any> {
  state = {
    modalVisible: false,
  };

  componentDidMount = () => {
    const howIFeelService = new HowIFeelService();
    this.setState({modalVisible: false});
    howIFeelService.setIsActive(this.props.dispatch, true);
  };

  setModalVisible(visible: boolean) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View>
        <View style={styles.wraper}>
          <CustomText style={styles.title}> Resultados </CustomText>
          <Image
            style={styles.img}
            source={require('assets/img/brain_lg.png')}
          />
          <CustomText style={styles.brainsNumber}>
            {' '} +100 {' '}
          </CustomText>
        </View>

        <View style={styles.boxContainer}>
          <View style={styles.boxLeftContainer}>
            <CustomText style={styles.textBlue}>Aciertos:</CustomText>
          </View>
          <View style={styles.boxRightContainer}>
            <CustomText style={styles.textCyan}>
              {this.props.route.params.questions_answered_correctly} /{' '}
              {this.props.route.params.total_questions_evaluated}
            </CustomText>
          </View>
        </View>

        <View style={styles.boxContainer}>
          <View style={styles.boxLeftContainer}>
            <CustomText style={styles.textBlue}>Tiempo:</CustomText>
          </View>
          <View style={styles.boxRightContainer}>
            <CustomText style={styles.textCyan}>
              {Math.ceil(this.props.route.params.time_view / 60)} min
            </CustomText>
          </View>
        </View>

        <ButtonBlue
          textBtn="Ver respuestas"
          onPressBtn={() => {
            this.setModalVisible(true);
          }}
        />

        <ModalResults
          animationType="none"
          headerTitle={
            this.props.route.params.hasOwnProperty('headerTitle')
              ? this.props.route.params.headerTitle
              : null
          }
          visible={this.state.modalVisible}
          navigation={this.props.navigation}
          dataResults={this.props.route.params.dataResults}
          onCloseModal={() => this.props.navigation.goBack()}
        />

        <View style={mainStyles.marginBottom80} />
      </View>
    );
  }
}

export default connect(mapStatesToProps)(ChallengeResults);
