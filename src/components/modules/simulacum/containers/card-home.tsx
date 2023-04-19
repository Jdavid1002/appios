import React, {Component} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {CustomText} from 'app_components/commons/customs/components/customComponents';
import SimualcrumService from 'app_services/simulacrum/simulacrum';
import {connect} from 'react-redux';
import {Button} from 'native-base';

import styles from '../styles/styles-card-home';

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
    lives: state.auth.user.lives
  };
}

class SimulacrumCard extends Component<any> {
  state = {loading: true};

  componentDidMount = async () => {
    this.setState({loading: true});
    const simualcrumService = new SimualcrumService();
    await simualcrumService.getLivesAvailable();

    this.setState({loading: false});
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.cardImageLeft}
          source={require('assets/img/home/bg_card_simulacrum.png')}
        />
        <CustomText style={[styles.title]}>Simulacros</CustomText>
        <View style={styles.starWraper}>
          <View style={styles.starContainer}>
            {!this.state.loading && this.props.lives === 3 ? (
              <>
                <Image
                  style={styles.star}
                  source={require('assets/img/star.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star.png')}
                />
              </>
            ) : (
              <View />
            )}

            {!this.state.loading && this.props.lives === 2 ? (
              <>
                <Image
                  style={styles.star}
                  source={require('assets/img/star.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star-light.png')}
                />
              </>
            ) : (
              <View />
            )}

            {!this.state.loading && this.props.lives === 1 ? (
              <>
                <Image
                  style={styles.star}
                  source={require('assets/img/star.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star-light.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star-light.png')}
                />
              </>
            ) : (
              <View />
            )}

            {!this.state.loading && this.props.lives === 0 ? (
              <>
                <Image
                  style={styles.star}
                  source={require('assets/img/star-light.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star-light.png')}
                />
                <Image
                  style={styles.star}
                  source={require('assets/img/star-light.png')}
                />
              </>
            ) : (
              <View />
            )}
            <View style={styles.brainContainer}>
              <Image
                style={styles.brainImage}
                source={require('assets/img/brain.png')}
              />
              <CustomText style={styles.textInfo}> {/*+120*/} </CustomText>
            </View>
          </View>
        </View>
        <CustomText style={[styles.subTitle]}>
          Ponte a prueba para las Pruebas Nacionales
        </CustomText>
        <Button
          style={[styles.button]}
          onPress={() => this.props.navigation.navigate('Simulacrums')}
          rounded
          small>
          <CustomText style={[styles.buttonText]}>
            Escoge tu asignatura
          </CustomText>
        </Button>
      </View>
    );
  }
}

export default connect(mapStatesToProps)(SimulacrumCard);
