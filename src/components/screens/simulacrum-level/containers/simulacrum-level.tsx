import React, {Component} from 'react';
import {ScrollView, View, FlatList, ActivityIndicator} from 'react-native';
import {CommonActions} from '@react-navigation/native';

import {CustomText} from 'app_components/commons/customs/components/customComponents';
import SimpleCard from 'app_components/commons/cards/components/simple-card';
import ButtonBlue from 'app_components/commons/buttons/components/button-blue';
import mainStyles from 'app_styles/MainStyles';
import styles from '../styles/styles';
import HowIFeel from 'app_components/commons/how-i-feel';
import SimualcrumService from 'app_services/simulacrum/simulacrum';

import {connect} from 'react-redux';

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
    lives: state.simulacrum.data.lives,
  };
}

class SimulacrumLevel extends Component<any> {
  state = {loading: true, data: [], selectedkey: null};

  componentDidMount = () => {
    this.setState({loading: true, data: [], selectedkey: null});
    this.initComponent();
  };

  componentWillUnmount = () => {
    this.setState({loading: true, data: [], selectedkey: null});
  };

  initComponent = async () => {
    const matterId = this.props.route.params.matterId;
    this.setState({loading: true});

    const simualcrumService = new SimualcrumService();
    await simualcrumService.getLivesAvailable(
      this.props.auth_token,
      this.props,
    );

    if (parseInt(this.props.lives) > 0) {
      switch (matterId) {
        case 1:
          // Matematicas
          this.setState({
            data: [
              {
                id: '1',
                title: 'Nivel 1',
                description:
                  'Tendrás que recordar información, definir conceptos e identificar elementos.',
              },
              {
                id: '2',
                title: 'Nivel 2',
                description:
                  'Tendrás que hacer relaciones simples, construir significados a partir de elementos mostrados y establecer conexiones.',
              },
              {
                id: '3',
                title: 'Nivel 3',
                description:
                  'Tendrás que resolver problemas, analizar partes de una situación para conocer relaciones e implicaciones.',
              },
              {
                id: 'all',
                title: 'Me siento preparado para todo',
                description: 'Quiero ver contenido de todos los niveles.',
              },
            ],
          });
          break;
        case 2:
          // Lenguaje
          this.setState({
            data: [
              {
                id: '1',
                title: 'Nivel 1',
                description:
                  'Tendrás que recordar datos, e identificar información en un texto.',
              },
              {
                id: '2',
                title: 'Nivel 2',
                description:
                  'Tendrás que hacer inferencias, encontrar el significado de una palabra o frase, establecer relaciones entre ideas y reconocer los tipos de texto.',
              },
              {
                id: '3',
                title: 'Nivel 3',
                description:
                  'Tendrás que reconocer significados que no están explícitos, comparar, contrastar, analizar y establecer relaciones complejas. Deberás asumir una posición crítica para identificar la intención del autor de un texto y extraer conclusiones que no aparecen en el texto.',
              },
              {
                id: 'all',
                title: 'Me siento preparado para todo',
                description: 'Quiero ver contenido de todos los niveles.',
              },
            ],
          });
          break;
        case 3:
          // Ciencias
          this.setState({
            data: [
              {
                id: '1',
                title: 'Nivel 1',
                description:
                  'Tendrás que recordar y comprender hechos, métodos y procesos, estructuras o marcos de referencia.',
              },
              {
                id: '2',
                title: 'Nivel 2',
                description:
                  'Encontrarás preguntas en las que tendrás que comprender información, y hagas relaciones directas.',
              },
              {
                id: '3',
                title: 'Nivel 3',
                description:
                  'Tendrás que aplicar principios, leyes y modelos para solucionar problemas en situaciones que tienen que ver con las ciencias de la naturaleza.',
              },
              {
                id: 'all',
                title: 'Me siento preparado para todo',
                description: 'Quiero ver contenido de todos los niveles.',
              },
            ],
          });
          break;
        default:
          // Sociales
          this.setState({
            data: [
              {
                id: '1',
                title: 'Nivel 1',
                description:
                  'Tendrás que recordar y comprender hechos históricos, información de acontecimientos pasados, y avances de la humanidad.',
              },
              {
                id: '2',
                title: 'Nivel 2',
                description:
                  'Tendrás que comprender procesos sociales, hechos históricos-geográficos, sociales, políticos y económicos. Analizarás elementos que te permitan comprender relaciones sociales, hechos y construir tu propio pensamiento.',
              },
              {
                id: '3',
                title: 'Nivel 3',
                description:
                  'Tendrás que aplicar principios, a partir de los cuales podrás analizar elementos que intervienen en una situación en la comunidad local, regional o nacional.',
              },
              {
                id: 'all',
                title: 'Me siento preparado para todo',
                description: 'Quiero ver contenido de todos los niveles.',
              },
            ],
          });
          break;
      }
    } else {
      const resetAction = CommonActions.reset({
        index: 2,
        routes: [
          {name: 'Home'},
          {name: 'Simulacrums'},
          {name: 'RecoverLivesScreen'},
        ],
      });

      this.props.navigation.dispatch(resetAction);
    }

    this.setState({loading: false});
  };

  goToSimulacrum = () => {
    const matterId = this.props.route.params.matterId;
    this.props.navigation.navigate('SimulacrumQuestion', {
      matterId: matterId,
      level: this.state.selectedkey,
    });
  };

  renderEmpty = () => (
    <CustomText> No hay información para mostrar </CustomText>
  );
  renderItem = ({item}: any = {}) => (
    <SimpleCard
      {...item}
      backgroundColor={
        this.state.selectedkey === item.id ? '#f0f4ff' : '#ffffff'
      }
      onPress={() => this.onPressLevel(item.id)}
    />
  );
  keyExtractor = (item: any = {}) => item.id.toString();
  itemSeparator = () => <View style={{marginTop: 5}} />;

  onPressLevel = (id: string) => {
    this.setState({selectedkey: id});
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
        <ScrollView style={mainStyles.container}>
          <View style={styles.wraper}>
            <CustomText style={styles.title}>Selecciona el nivel</CustomText>

            <FlatList
              style={styles.list}
              keyExtractor={this.keyExtractor}
              data={this.state.data}
              ListEmptyComponent={this.renderEmpty}
              ItemSeparatorComponent={this.itemSeparator}
              renderItem={this.renderItem}
              selectedItem={this.state.selectedkey}
            />

            <ButtonBlue
              style={styles.button}
              textBtn="Siguiente"
              disabled={this.state.selectedkey === null ? true : false}
              onPressBtn={this.goToSimulacrum}
            />
          </View>
        </ScrollView>
        <HowIFeel screen="section_simulacrum_page" />
      </React.Fragment>
    );
  }
}

export default connect(mapStatesToProps)(SimulacrumLevel);
