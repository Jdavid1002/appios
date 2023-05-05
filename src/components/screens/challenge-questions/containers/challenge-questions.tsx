import React, {Component} from 'react';
import {View, ScrollView, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {Http, HttpCustomStructure} from '../../../../utils/http';


import InlineWebview from '../../../../components/commons/webview';

import QuestionNavigate from '../../../../components/commons/question/containers/question-navigate';
import ButtonBlue from '../../../../components/commons/buttons/components/button-blue';
import HowIFeel from '../../../../components/commons/how-i-feel';

import mainStyles from '../../../../styles/MainStyles';
import {styles} from './../index';


function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
    user : state.auth.user,
    alliance_id: state?.auth?.user?.alliance_id,
  };
}

class ChallengeQuestions extends Component<any, any> {
  public _unsubscribe : any = null;

  state: any = {
    loading: true,
    start_time: null,
    question_per_challenge: 0,
    max_level: 0,
    current_question: 1,
    questions: {},
    current_question_data: {},
    current_answers: [],
    selected_answer: {},
    statistics: []
  };

  lettersByIndex : any = {
    0 : 'A',
    1 : 'B',
    2 : 'C',
    3 : 'D',
    4 : 'E',
    5 : 'F',
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.updateInitialState()
    });
    this.updateInitialState()
  }

  updateInitialState = () => {
    this.setState({
      loading: true,
      start_time: null,
      question_per_challenge: 0,
      max_level: 0,
      current_question: 1,
      questions: [],
      current_question_data: {},
      current_answers: [],
      selected_answer: {},
      statistics : []
    });
    this.getQuestionsBySection();
  }

  componentWillUnmount = () => {
    this.setState({
      loading: true,
      start_time: null,
      question_per_challenge: 0,
      max_level: 0,
      current_question: 1,
      questions: [],
      current_question_data: {},
      current_answers: [],
      selected_answer: {},
      statistics : []
    });
  };

  getQuestionsBySection = async () => {
    this.setState({
      ...this.state,
      loading: true,
    })

    const section = this?.props?.route?.params?.section;
    const newQuestions = section?.questions?.map((_question : any, idx : number) => {
      return {
        ..._question,
        position: idx + 1,
        answers : _question?.answers?.map((item : any) => {
          return {
            ...item,
            id: item?._id,
            title: item?.content,
            correct: item?.is_correct,
            comment: item?.feedback,
            selected: false,
          }
        })
      }
    })

    //@INFO Obtener la primera pregunta sin estadisticas, es decir sin ser resuelta. En caso de que no encuentre ninguna coloca la primera.
    const statistics_ids = this?.props?.route?.params?.academicResourceData?.config?.attempt_active?.results?.statistics?.map((item: any)=> item?.question)
    const nextQuestion = newQuestions?.find((item : any) => !statistics_ids?.includes(item?._id))
    const questionSelected = nextQuestion || newQuestions[0]

    this.setState({
      loading: false,
      start_time: new Date(),
      questions: newQuestions,
      question_per_challenge: newQuestions?.length,
      max_level: newQuestions?.length,
    });

    // Setea la primer pregunta en el nivel inicial
    await this.setQuestion(questionSelected);
  };

  handlePressAnswer = (answer: any) => {
    const current_answers = this?.state?.current_answers?.map((_answer: any) => {
      if (_answer._id === answer?._id) {
        return {
          ..._answer,
          selected : true
        }
      } else {
        return {
          ..._answer,
          selected : false
        }
      }
    });

    const newStatistics = this?.state?.statistics?.concat([{
      answer: answer?.unique,
      question : this?.state?.current_question_data?._id || this?.state?.current_question_data?.id,
    }])

    this.setState({
      selected_answer: answer,
      statistics : newStatistics,
      current_answers: current_answers
    });
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
    if (!response) this.noQuestionError();
  };

  changeCurrentQuestion = async (question: any) => {
    this.setState({
      current_question_data: question,
      current_answers: question?.answers,
      selected_answer: {},
      current_question : question?.position
    });

    this.setState({loading: false});
    return true;
  };

  changeQuestionByNavigate = (math : '+' | '-') => {
    const validateMath = math === '+' ? this.state.current_question + 1 : this.state.current_question - 1
    const destinyQuestion = this.state.questions?.find((question : any) => question?.position === validateMath)
    if (destinyQuestion) {
      this.setState({
        loading: true,
      });
      this.changeCurrentQuestion(destinyQuestion);
    }
  };

  handlePressButtonSend = async () => {
    const section = this?.props?.route?.params?.section;

    const currentStatisticsInDataBase = this?.props?.route?.params?.academicResourceData?.config?.attempt_active?.results?.statistics || []
    //@INFO se concatenan las estadisticas pasadas y las nuevas, ademas de eliminar elementos null
    const newStatistics = [...currentStatisticsInDataBase, ...this.state.statistics].filter((item : any) => item)

    let qualify : boolean = false

    const new_statistics_ids = newStatistics?.map((item : any) => item?.question)
    const new_questions_ids = this?.props?.route?.params?.academicResourceData?.config?.questions?.map((item : any) => item?._id)

    const getQuestionsNotSelectedInAllStatistics = new_questions_ids?.filter((item : any) => !new_statistics_ids.includes(item))
    if(!getQuestionsNotSelectedInAllStatistics?.length) qualify = true

    const questionsByConfiguration = this?.props?.route?.params?.academicResourceData?.config?.attempt_active?.results?.questionsByConfiguration?.length
    ? this?.props?.route?.params?.academicResourceData?.config?.attempt_active?.results?.questionsByConfiguration
    : this?.props?.route?.params?.academicResourceData?.config?.questionsByConfiguration

    const questionsToEvaluate = this?.props?.route?.params?.academicResourceData?.config?.attempt_active?.results?.questionsToEvaluate?.length
    ? this?.props?.route?.params?.academicResourceData?.config?.attempt_active?.results?.questionsToEvaluate
    : this?.props?.route?.params?.academicResourceData?.config?.questions?.map((item : any)=> item?._id)


    const params = {
      results: {
        currentSection: section?.uuid,
        deliverable_date: (new Date()),
        questionsByConfiguration : questionsByConfiguration,
        questionsToEvaluate : questionsToEvaluate,
        statistics : newStatistics
      },
      deliverable_date: (new Date()),
      qualify : qualify,
      academic_resource_config: this.props?.route?.params?.academicResourceData?.academic_resource_config,
      user: this.props.user?._id,
      diagnostic_id:this.props.route.params.matterId
    }


    const alliance = this.props.alliance_id

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: `/api/academic-resource-attempt/${alliance}/attempt`,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.auth_token,
      }),
      params: params,
      auth_token: this.props.auth_token
    };

    const data = await Http.send(query_data);

    if(data?.status_code !== 'success'){
      console.log('error', data)
      return
    }

    //@INFO En caso de que se haya terminado el diagnostico.
    if(qualify){
      Alert.alert(
        'Perfecto',
        '¡Terminaste esta el diagnostico!'
      )
      this.props.navigation.navigate('Home',{})
      return
    }

    const questions_ids = this?.state?.questions?.length > 0 ? this?.state?.questions?.map((item : any)=> item?._id).reduce(function (acc : any, curr : any) {
      if (!acc.includes(curr))
      acc.push(curr);
      return acc;
    }, []) : []

    const questions_selected_id = newStatistics?.length > 0 ? newStatistics?.map((item : any)=> item?.question).reduce(function (acc : any, curr : any) {
      if (!acc.includes(curr))
      acc.push(curr);
      return acc;
    }, []) : []

    const getQuestionsNoSelecteds = questions_ids?.filter((item : any) => !questions_selected_id.includes(item))

    if(!getQuestionsNoSelecteds?.length){
      Alert.alert(
        'Perfecto',
        '¡Terminaste esta seccion del diagnostico!'
      )
      this.props.navigation.navigate('SectionsMatter', {
        matterId: this.props.route.params.matterId,
        configCategory: '6303ed5f3138387a1669d7ac',
        getChallengesData: this.props.route.params.getChallengesData(),
      });
    }else{
      this.changeQuestionByNavigate('+')
    }

  };

  noQuestionError = () => {
    Alert.alert(
      'Error',
      'No existe una pregunta disponible',
      [{text: 'OK', onPress: () => this.props.navigation.navigate('Home')}],
      {cancelable: false},
    );
  };

  render() {


    if (this.state.loading) {
      return (
        <View style={[mainStyles.container, mainStyles.containerLoading]}>
          <ActivityIndicator size="large" color="#061946" />
        </View>
      );
    };

    return (
      <React.Fragment>
        <ScrollView style={[mainStyles.container]}>
          <QuestionNavigate
            currentItem={this.state.current_question}
            totalItem={this.state.question_per_challenge}
            disableNext={true}
            disablePrev={false}
            text="Pregunta"
            onPressNextItem={() => this.changeQuestionByNavigate('+')}
            onPressPrevItem={() => this.changeQuestionByNavigate('-')}
          />
          <React.Fragment>
            {/* Titulo de la pregunta. */}
            <InlineWebview
              html={`${this.state.current_question_data?.content || ''}`}
              style={[styles.webview]}
            />

            {this?.state?.current_answers?.map((answer: any, i: number) => (
              <View>
                <TouchableOpacity
                  key={answer.id}
                  onPress={() => this.handlePressAnswer(answer)}
                  style={{marginBottom: 16}}
                  >
                  <View
                    style={[
                      styles.responseOption,
                      answer.selected && styles.responseSelectedOption,
                    ]}
                    >
                    <InlineWebview
                      html={`<span>${this.lettersByIndex[i]}).&nbsp; ${answer.content}</span>`}
                      css={`span, span * { display: inline; }`}
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
        </ScrollView>
        <HowIFeel screen="section_challenge" />
      </React.Fragment>
    );
  }
}

export default connect(mapStatesToProps)(ChallengeQuestions);
