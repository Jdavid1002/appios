import React from 'react';
import {connect} from 'react-redux';

import TriviaService from '../../../../services/trivia';

import {TriviaLayout} from './../index';
import {TriviaAnswers, TriviaType} from '../../../../reducers/trivia/types';
import { store } from '../../../../storage/redux-storage';
import { Http, HttpCustomStructure } from '../../../../utils/http';
import { updateAnswerOfDateQuestionDay, updateAnswerOfDateTriviaDay } from '../../../../reducers/not_auth_Info/actions';

export interface ITriviaScreenProps {
  route: {
    params: {
      trivia: TriviaType;
    };
  };
}

class Trivia extends React.Component<any, any> {
  constructor(props: ITriviaScreenProps) {
    super(props);
    const trivia = props.route.params.trivia;
    const correctAnswer = trivia?.answers?.find(
      (item: TriviaAnswers) => item?.is_correct,
    );

    this.state = {
      selectedOption: '',
      correctAnswer: correctAnswer,
      correct: false,
      loading: false,
      answered: false,
      brains: null,
    };

    this.selectOption = this.selectOption.bind(this);
  }

  selectOption = (option: TriviaAnswers) => {
    if (this.state.selectedOption !== option._id) {
      this.setState({selectedOption: option._id});
    }
  };

  generateGamification = async () => { 
    const trivia = store.getState()?.trivia

    store.dispatch(updateAnswerOfDateTriviaDay({
      date : new Date(),
      _id : this?.props?.user_id
    }))

    const params = {
      results: {
        deliverable_date: (new Date()),
        questionsToEvaluate : [trivia._id],
        statistics : [{
          question: trivia._id,
          answer : this.state.selectedOption
        }]
      },
      deliverable_date: (new Date()),
      qualify : false,
      academic_resource_config: trivia?.academic_resource_config,
      user: this.props.user_id,
    }

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: `/api/academic-resource-attempt/${this.props.alliance_id}/attempt`,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.auth_token || '',
      }),
      params: params,
      auth_token: this.props.auth_token,
    };

    const data = await Http.send(query_data);

    if(data?.code !== 200) return false

    return true
  }

  getNewTriviaAfterResponse = async () => {
    const triviaService = new TriviaService();
    await triviaService.getTrivia(
      this.props.auth_token,
      this.props.dispatch,
      this.props.alliance_id,
      this.props.user_id,
    );
  }

  saveAnswer = async () => {
    this.setState({...this.state, loading: true, answered: true});

    if (this.state.selectedOption) {

      await this.generateGamification()

      const newState = {
        ...this.state,
        loading: false,
        brains: 10,
        correct: this?.state?.correctAnswer?._id === this?.state?.selectedOption,
        answered : true
      }

      this.setState(newState);

      await this.getNewTriviaAfterResponse()
    }
  };

  render() {
    return (
      <TriviaLayout
        navigation={this.props.navigation}
        trivia={this.props.route.params.trivia}
        state={this.state}
        selectOption={this.selectOption}
        saveAnswer={this.saveAnswer}
      />
    );
  }
}

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
    user_id: state?.auth?.user?._id,
    alliance_id: state?.auth?.user?.alliance_id,
  };
}

export default connect(mapStatesToProps)(Trivia);
