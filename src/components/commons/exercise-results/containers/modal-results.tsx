import React, {Component} from 'react';
import {Modal, ScrollView} from 'react-native';

import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import HeaderApp from '../../../../components/commons/header/containers/header';
import QuestionList from '../../../../components/commons/exercise-results/containers/questions-list';
import ButtonRed from '../../../../components/commons/buttons/components/button-red';

import mainStyles from '../../../../styles/MainStyles';
import styles from '../styles/styles-modal-results';

class ModalResults extends Component<any> {
  render() {
    const props_menu_navigation = this.props.navigation;
    
    return (
      <Modal {...this.props}>
        <HeaderApp
          navigation={props_menu_navigation}
          title="Resultados"
          previous={true}
        />

        <ScrollView style={[mainStyles.container]}>
          <CustomText style={styles.title}>Respuestas</CustomText>
          <QuestionList dataResults={this.props.dataResults} />
          <ButtonRed
            style={{marginBottom: 80, marginTop: 30, marginHorizontal: 0}}
            textBtn="Salir"
            onPressBtn={this.props.onCloseModal}
          />
        </ScrollView>
      </Modal>
    );
  }
}

export default ModalResults;
