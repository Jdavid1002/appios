import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import QuestionNavigate from '../../../../components/commons/question/containers/question-navigate';
import LessonCard from '../../../../components/commons/lesson/containers/lesson-card';

import {connect} from 'react-redux';
import {Http, HttpCustomStructure} from '../../../../utils/http';

import mainStyles from '../../../../styles/MainStyles';
import styles from '../styles/styles';

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
    alliance_id: state?.auth?.user?.alliance_id,
    user_id: state?.auth?.user?._id,
  };
}

class LearningPath extends Component<any> {
  public _unsubscribe : any = null;
  state: any = {
    loading: true,
    no_learning_path: false,
    learning_path: {},
    current_stage: 0,
    total_stage: 0,
    lesson_statistics: {},
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getLearningPath();
    });
    this.getLearningPath();
  }


  getLearningPath = async () => {
    this.setState({loading: true});

    const matterId = this.props.route.params.matterId;

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: `/api/academic-component-automatic-learning-way/${this?.props?.alliance_id}/path`,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      params: {
        container_id: matterId,
      },
      auth_token: this.props.auth_token,
    };

    const data = await Http.send(query_data);

    this.setState({loading: false});

    const newLearningPath: any = {};

    data?.course_data?.learning_way.forEach((element: any, idx: number) => {
      newLearningPath[idx + 1] = element;
    });

    if (data.status === 'success') {
      this.setState({
        learning_path: newLearningPath,
        current_stage: 1,
        total_stage: Object.keys(newLearningPath).length,
      });
      this.getStatisticsProgress(data);
    } else if (data.status_code === 'learning_path_not_learning_path') {
      this.setState({
        no_learning_path: true,
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

  getStatisticsProgress = async (learning_data: any) => {
    const resource_ids = learning_data?.course_data?.resource_ids;
    let lessons_ids: string[] = [];

    for (const _stage of learning_data?.course_data?.learning_way) {
      _stage?.childs
        ?.map((item: any) => item?.id)
        .forEach((id: string) => {
          lessons_ids.push(id);
        });
    }

    const matterId = this.props.route.params.matterId;

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: '/api/learning-way/get-way-statistics',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      params: {
        learning_way_id: matterId,
        lessons: lessons_ids,
        resources: resource_ids,
        user_id: this.props.user_id,
      },
      auth_token: this.props.auth_token,
    };

    const data = await Http.send(query_data);

    if (data?.code === 200) {
      let lesson_statistics: any = {};
      for (const _lesson of data?.way_statistics?.lesson_statistics) {
        lesson_statistics = {
          ...lesson_statistics,
          [_lesson?.lesson_id]: _lesson?.progress,
        };
      }

      this.setState({
        lesson_statistics: lesson_statistics,
      });
    }
  };

  goToStage = (stage: number) => {
    this.setState({
      current_stage: stage,
    });
  };

  renderEmpty = () => (
    <CustomText> No hay información para mostrar </CustomText>
  );
  renderItem = ({item}: any = {}) => (
    <LessonCard
      {...item}
      progress={this.state.lesson_statistics[item?.id]}
      matterId={this.props.route.params.matterId}
      stage={this?.state?.learning_path[this?.state?.current_stage]?.id}
    />
  );
  keyExtractor = (item: any = {}) => item.id;
  itemSeparator = () => <View style={{marginTop: 5}} />;

  render() {
    if (this.state.loading) {
      return (
        <View style={[mainStyles.container, styles.containerLoading]}>
          <ActivityIndicator size="large" color="#061946" />
        </View>
      );
    }

    if (this.state.no_learning_path === true) {
      return (
        <ScrollView style={[mainStyles.container]}>
          <CustomText
            style={{
              color: '#e94044',
              fontSize: 32,
              fontWeight: 'bold',
              marginTop: 20,
              marginBottom: 20,
              textAlign: 'center',
            }}>
            ¡Ruta de aprendizaje!
          </CustomText>
          <CustomText
            style={{color: '#061946', fontSize: 20, marginBottom: 20}}>
            No tienes lecciones asociadas a esta ruta de aprendizaje.
          </CustomText>
        </ScrollView>
      );
    }

    return (
      <ScrollView style={[mainStyles.container]}>
        <CustomText
          style={{
            color: '#e94044',
            fontSize: 32,
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 20,
            textAlign: 'center',
          }}>
          ¡Ya tienes tu ruta!
        </CustomText>
        <CustomText style={{color: '#061946', marginBottom: 20}}>
          Se ha generado tu ruta aprendizaje. Para mayor comodidad hemos
          organizado las lecciones en grupos de 10.
        </CustomText>

        <QuestionNavigate
          style={{flex: 1, justifyContent: 'flex-start', marginBottom: 0}}
          currentItem={this.state.current_stage}
          totalItem={this.state.total_stage}
          text="Etapa"
          colorText="#061946"
          onPressNextItem={() => {
            this.goToStage(this.state.current_stage + 1);
          }}
          onPressPrevItem={() => {
            this.goToStage(this.state.current_stage - 1);
          }}
        />

        {this.state.learning_path.hasOwnProperty(this.state.current_stage) ? (
          <FlatList
            style={{marginTop: 20, marginBottom: 100}}
            keyExtractor={this.keyExtractor}
            data={this.state.learning_path[this.state.current_stage]?.childs}
            ListEmptyComponent={this.renderEmpty}
            ItemSeparatorComponent={this.itemSeparator}
            renderItem={this.renderItem}
          />
        ) : (
          <View />
        )}
      </ScrollView>
    );
  }
}

export default connect(mapStatesToProps)(LearningPath);
