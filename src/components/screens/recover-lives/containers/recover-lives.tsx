import React, {Component} from 'react';
import {ScrollView, View, Alert, ActivityIndicator} from 'react-native';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import QuestionList from '../../../../components/commons/exercise-results/containers/questions-list';

import styles from '../styles/styles';
import mainStyles from '../../../../styles/MainStyles';

import {connect} from 'react-redux';
import {Http, HttpCustomStructure} from '../../../../utils/http';

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
  };
}

class RecoverLives extends Component<any> {
  state = {loading: false, questions_data: {}};

  componentDidMount = () => {
    this.setState({loading: false, questions_data: {}});
    this.getQuestionsData();
  };

  getQuestionsData = async () => {
    const query_data: HttpCustomStructure = {
      method: 'GET',
      url: '/api/simulacrums/questions-to-recover-lives',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.auth_token,
      }),
    };

    const data = await Http.send(query_data);
    if (data.status === 'success') {
      let questions_data = [];
      for (var i in data.questions_to_recover) {
        let comment = data.questions_to_recover[i].answers.filter(
          (a: any) => a.comment !== '',
        );
        let data_q = {
          number: parseInt(i) + 1,
          title: data.questions_to_recover[i].title,
          description: data.questions_to_recover[i].description,
          comment: comment.length > 0 ? comment[0].comment : '',
          correct: false,
        };
        if (Object.keys(data.questions_to_recover[i].lesson).length) {
          data_q.lesson = {
            id: data.questions_to_recover[i].lesson.id,
            name: data.questions_to_recover[i].lesson.name,
            progress: data.questions_to_recover[i].lesson.progress,
            image: data.questions_to_recover[i].lesson.image,
            url: data.questions_to_recover[i].lesson.url + '?recover=1',
            textBtn: 'Recuperar oportunidad ★',
          };
        }
        questions_data.push(data_q);
      }
      this.setState({
        loading: false,
        questions_data: questions_data,
      });
    } else {
      Alert.alert(
        'Error',
        data.message,
        [{text: 'OK', onPress: () => this.props.navigation.navigate('Home')}],
        {cancelable: false},
      );
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
      <ScrollView style={[mainStyles.container]}>
        <CustomText style={styles.title}>Recuperar vidas</CustomText>
        <CustomText style={styles.text}>
          Puedes esperar
          <CustomText style={styles.textBold}> 15 minutos </CustomText>o mira
          las lecciones de tus respuestas erróneas, así tendrás
          <CustomText style={styles.textBold}>
            {' '}
            3 nuevas oportunidades.{' '}
          </CustomText>
        </CustomText>
        <QuestionList dataResults={this.state.questions_data} />
        <View style={mainStyles.marginBottom80} />
      </ScrollView>
    );
  }
}

export default connect(mapStatesToProps)(RecoverLives);
