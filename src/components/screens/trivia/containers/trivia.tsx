import React from 'react';
import {connect} from 'react-redux';

import TriviaService from '../../../../services/trivia';

import {TriviaLayout} from './../index';
import {TriviaAnswers, TriviaType} from '../../../../reducers/trivia/types';

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

  saveAnswer = async () => {
    this.setState({...this.state, loading: true, answered: true});
    if (this.state.selectedOption) {
      const triviaService = new TriviaService();

      const triviaData = {
        trivia_id: this.props.route.params.trivia._id,
        time_view: 30,
        questions: [
          {
            id: this.props.route.params.trivia.questions[0].id,
            answers: [this.state.selectedOption],
          },
        ],
      };

      const triviaResponse = await triviaService.save(
        triviaData,
        this.props.auth_token,
      );

      this.setState({
        ...this.state,
        loading: false,
        brains: 10,
        correct: triviaResponse.questions_answered_correctly === 1,
      });

      await triviaService.getTrivia(this.props.auth_token, this.props.dispatch);
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
  };
}

export default connect(mapStatesToProps)(Trivia);
