import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';

import {DispatchProp, connect} from 'react-redux';
import {Http, HttpCustomStructure} from '../../../../utils/http';

import InlineWebview from '../../../../components/commons/webview';

import QuestionNavigate from '../../../../components/commons/question/containers/question-navigate';
import ButtonBlue from '../../../../components/commons/buttons/components/button-blue';
import ModalLives from '../../../../components/commons/question/components/modal-lives';
import HowIFeel from '../../../../components/commons/how-i-feel';

import mainStyles from '../../../../styles/MainStyles';
import {styles} from './../index';
import SimulacrumService from '../../../../services/simulacrum/simulacrum';
import {updateLives} from '../../../../reducers/auth/actions';

class SimulacrumQuestions extends Component<any, any> {
  private simulacrumService = new SimulacrumService();

  state: any = {
    loading: true,
    start_time: null,
    question_per_simulacrum: 0,
    max_level: 0,
    current_question: 1,
    questions: {},
    current_question_data: {},
    current_answers: [],
    selected_answer: {},
    statistics: [],
    lives: 3,
    modalVisible: false,
    success_response_question : 0
  };

  lettersByIndex: any = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
  };

  componentDidMount = () => {
    this.setState({
      loading: true,
      start_time: null,
      question_per_simulacrum: 0,
      max_level: 0,
      current_question: 1,
      questions: {},
      current_question_data: {},
      current_answers: [],
      selected_answer: {},
      statistics: [],
      modalVisible: false,
      success_response_question : 0
    });
    this.getSimulacrumsQuestions();
  };

  componentWillUnmount = () => {
    this.setState({
      loading: true,
      start_time: null,
      question_per_simulacrum: 0,
      max_level: 0,
      current_question: 1,
      questions: {},
      current_question_data: {},
      current_answers: [],
      selected_answer: {},
      statistics: [],
      success_response_question : 0
    });
  };

  showModalLives = () => {
    this.setState({modalVisible: true});
  };

  hideModal = () => {
    if (this.props.lives === 0) {
      this.props.navigation.navigate('Simulacrums');
    }
    this.setState({modalVisible: false});
  };

  getSimulacrumsQuestions = async () => {
    const section = this?.props?.route?.params?.section;
    const dontUseStatistics = this?.props?.route?.params?.dontUseStatistics;
    const newQuestions = section?.questions?.map(
      (_question: any, idx: number) => {
        return {
          ..._question,
          position: idx + 1,
          answers: _question?.answers?.map((item: any) => {
            return {
              ...item,
              id: item?._id,
              title: item?.content,
              correct: item?.is_correct,
              comment: item?.feedback,
              selected: false,
            };
          }),
        };
      },
    );

    //@INFO Obtener la primera pregunta sin estadisticas, es decir sin ser resuelta. En caso de que no encuentre ninguna coloca la primera.
    const statistics_ids = dontUseStatistics ? [] :
      this?.props?.route?.params?.academicResourceData?.config?.attempt_active?.results?.statistics?.map(
        (item: any) => item?.question,
      );
    const nextQuestion = newQuestions?.find(
      (item: any) => !statistics_ids?.includes(item?._id),
    );
    const questionSelected = dontUseStatistics ? newQuestions[0] : (nextQuestion || newQuestions[0])

    this.setState({
      loading: false,
      start_time: new Date(),
      questions: newQuestions,
      question_per_simulacrum: newQuestions?.length,
      max_level: newQuestions?.length,
    });

    // Setea la primer pregunta en el nivel inicial
    await this.setQuestion(questionSelected);
  };

  setQuestion = async (question: any) => {
    this.setState({loading: true});

    // Busca una pregunta del mismo nivel o inferior
    let response: any = false;
    try {
      response = await this.changeCurrentQuestion(question);
    } catch (e) {
      response = e;
    }
    this.setState({loading: false});
    if (!response) {
      this.noQuestionError();
    }
  };

  changeCurrentQuestion = async (question: any) => {
    this.setState({
      current_question_data: question,
      current_answers: question?.answers,
      selected_answer: {},
      current_question: question?.position,
    });

    this.setState({loading: false});
    return true;
  };

  noQuestionError = () => {
    Alert.alert(
      'Error',
      'No existe una pregunta disponible',
      [{text: 'OK', onPress: () => this.props.navigation.navigate('Home')}],
      {cancelable: false},
    );
  };

  changeQuestionByNavigate = (math: '+' | '-') => {
    const validateMath =
      math === '+'
        ? this.state.current_question + 1
        : this.state.current_question - 1;
    const destinyQuestion = this.state.questions?.find(
      (question: any) => question?.position === validateMath,
    );
    if (destinyQuestion) {
      this.setState({
        loading: true,
      });
      this.changeCurrentQuestion(destinyQuestion);
    }
  };

  handlePressButtonSend = async () => {
    const section = this?.props?.route?.params?.section;
    const dontUseStatistics = this?.props?.route?.params?.dontUseStatistics;
    const isQuestionOfDay = this?.props?.route?.params?.isQuestionOfDay;

    const currentStatisticsInDataBase =
    this?.props?.route?.params?.academicResourceData?.config?.attempt_active?.results?.statistics 
    || [];
    
    //@INFO se concatenan las estadisticas pasadas y las nuevas, ademas de eliminar elementos null
    const newStatistics = dontUseStatistics 
    ? this.state.statistics 
    : [
      ...currentStatisticsInDataBase,
      ...this.state.statistics,
    ].filter((item: any) => item);

    //@INFO En caso de no necesitar estadisticas se enviaran todas las preguntas.
    const questionsByConfiguration = dontUseStatistics 
      ?  {[section?.currentSection] : section?.questions?.map((question: any) => question?._id)}
      : 
      this?.props?.route?.params
      ?.academicResourceData?.config?.attempt_active?.results
      ?.questionsByConfiguration?.length
      ? this?.props?.route?.params?.academicResourceData?.config?.attempt_active
          ?.results?.questionsByConfiguration
      : this?.props?.route?.params?.academicResourceData?.config
          ?.questionsByConfiguration;

    const questionsToEvaluate = dontUseStatistics 
    
    ? section?.questions?.map((question: any) => question?._id)

    : this?.props?.route?.params?.academicResourceData
      ?.config?.attempt_active?.results?.questionsToEvaluate?.length
      ? this?.props?.route?.params?.academicResourceData?.config?.attempt_active
          ?.results?.questionsToEvaluate
      : this?.props?.route?.params?.academicResourceData?.config?.questions?.map(
          (item: any) => item?._id,
        );

    const academic_resource_config = dontUseStatistics ? section?.academic_resource_config  : this.props?.route?.params?.academicResourceData?.academic_resource_config

    const params = {
      results: {
        currentSection: section?.uuid,
        deliverable_date: new Date(),
        questionsByConfiguration: questionsByConfiguration,
        questionsToEvaluate: questionsToEvaluate,
        statistics: newStatistics,
      },
      deliverable_date: new Date(),
      qualify: false,
      academic_resource_config: academic_resource_config,
      user: this.props.user?._id,
    };

    const alliance = this.props.alliance_id;

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: `/api/academic-resource-attempt/${alliance}/attempt`,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.auth_token,
      }),
      params: params,
      auth_token: this.props.auth_token,
    };

    const data = await Http.send(query_data);

    if (data?.status_code !== 'success') {
      console.log('error', data);
      // return;
    }

    let new_success_response_question = this.state.success_response_question

    if (!this.state.selected_answer.is_correct) {
      const lostLive = await this.simulacrumService.lostLive();
      if (lostLive.status === 'success') {
        this.props.dispatch(updateLives(lostLive.attempts));
        this.showModalLives();
      }
    }else{
      this.setState({
        ...this.state,
        success_response_question : new_success_response_question + 1
      })
      new_success_response_question = new_success_response_question + 1
    }

    const questions_ids =
      this?.state?.questions?.length > 0
        ? this?.state?.questions
            ?.map((item: any) => item?._id)
            .reduce(function (acc: any, curr: any) {
              if (!acc.includes(curr)) {
                acc.push(curr);
              }
              return acc;
            }, [])
        : [];

    const questions_selected_id =
      this?.state?.statistics?.length > 0
        ? this?.state?.statistics
            ?.map((item: any) => item?.question)
            .reduce(function (acc: any, curr: any) {
              if (!acc.includes(curr)) {
                acc.push(curr);
              }
              return acc;
            }, [])
        : [];

    const getQuestionsNoSelecteds = questions_ids?.filter(
      (item: any) => !questions_selected_id.includes(item),
    );

    if (!getQuestionsNoSelecteds?.length) {

      //@INFO Cuando la vista se usa en una pregunta del dia.
      if(isQuestionOfDay) {
        this.getDailyQuestions()
        this.props.navigation.navigate('ChallengeResults', {
          questions_answered_correctly : new_success_response_question,
          total_questions_evaluated : section?.questions?.length,
          time_view : 155,
          dataResults : this.convertQuestionInFormatOfSummary(newStatistics)
        })
        return
      }

      //@INFO Cuando la vista se usa en un simulacro
      this?.props?.route?.params?.getSectionsOfSimulacrum();
      this.props.navigation.navigate('SectionsSimulacrum', {
        customParams: {
          alliance: this?.props?.alliance_id,
          simulacrum: this?.props?.route?.params?.SimulacrumId,
        },
        configCategory: '601981dcef21ba13c3843b88',
        isSimulacrum: true,
      });
    } else {
      this.changeQuestionByNavigate('+');
    }
  };

  handlePressAnswer = (answer: any) => {
    const current_answers = this?.state?.current_answers?.map(
      (_answer: any) => {
        if (_answer._id === answer?._id) {
          return {
            ..._answer,
            selected: true,
          };
        } else {
          return {
            ..._answer,
            selected: false,
          };
        }
      },
    );

    const newStatistics = [
      ...this?.state?.statistics,
      {
        answer: answer?.unique,
        question:
          this?.state?.current_question_data?._id ||
          this?.state?.current_question_data?.id,
      },
    ];

    this.setState({
      selected_answer: answer,
      statistics: newStatistics,
      current_answers: current_answers,
    });
  };

  getDailyQuestions = async () => {
    const simulacrumService = new SimulacrumService();
    await simulacrumService.getDailyQuestion(this.props.auth_token, this.props.dispatch, this.props.alliance_id, this.props.user_id);
  };

  convertQuestionInFormatOfSummary = (new_statistics : any) => {
    const section = this?.props?.route?.params?.section;

    return section?.questions?.map((item : any) => {
      const answer_unique = new_statistics?.find((statistic : any) => statistic?.question === item?._id)?.answer
      const answer = item?.answers?.find((answer : any) => answer?.unique === answer_unique)
      return {
        question : {
          _id : item?._id,
          content : item?.content
        },
        answer : {
          _id :answer?._id,
          content : answer?.content,
          is_correct : answer?.is_correct
        }
      }
    })
    
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={[mainStyles.container, mainStyles.containerLoading]}>
          <ActivityIndicator size="large" color="#061946" />
        </View>
      );
    }

    return (
      <React.Fragment>
        <ScrollView style={[mainStyles.container]}>
          <QuestionNavigate
            currentItem={this.state.current_question}
            totalItem={this.state.question_per_simulacrum}
            text="Pregunta"
            onPressNextItem={() => this.changeQuestionByNavigate('+')}
            onPressPrevItem={() => this.changeQuestionByNavigate('-')}
          />
          {Object.keys(this.state.current_question_data).length > 0 ? (
            <React.Fragment>
              <InlineWebview
                html={`${this.state.current_question_data?.content || ''}`}
                style={[styles.webview]}
              />
              {this.state.current_answers.map((answer: any, i: number) => (
                <View>
                  <TouchableOpacity
                    key={answer.id}
                    onPress={() => this.handlePressAnswer(answer)}
                    style={{marginBottom: 16}}>
                    <View
                      style={[
                        styles.responseOption,
                        answer.selected && styles.responseSelectedOption,
                      ]}>
                      <InlineWebview
                        html={`<span>${this.lettersByIndex[i]}).&nbsp; ${answer.content}</span>`}
                        css={'span, span * { display: inline; }'}
                        style={[styles.webview]}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
              <ButtonBlue
                textBtn="Responder"
                onPressBtn={this.handlePressButtonSend}
                disabled={
                  Object.keys(this.state.selected_answer).length > 0
                    ? false
                    : true
                }
              />
            </React.Fragment>
          ) : (
            <View />
          )}

          <ModalLives
            animationType="slide"
            visible={this.state.modalVisible}
            onCloseModal={() => {
              this.hideModal();
            }}
            transparent={true}
            lives={this.props.lives}
            presentationStyle="overFullScreen"
          />
        </ScrollView>
        <HowIFeel screen="section_simulacrum" />
      </React.Fragment>
    );
  }
}

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
    user: state.auth.user,
    alliance_id: state?.auth?.user?.alliance_id,
    lives: state.auth.user.lives,
  };
}

export default connect(mapStatesToProps)(SimulacrumQuestions);
