import React from 'react';
import {connect} from 'react-redux';

import TriviaService from 'app_services/trivia';

import {TriviaLayout} from '../index';

class Trivia extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    let correctAnswer = null;

    if (props.route.params.trivia.status === 'success') {
      correctAnswer = props.route.params.trivia.questions[0].answers.filter(
        (answer: any) => answer.correct === 1,
      )[0];
    }

    this.state = {
      selectedOption: null,
      correctAnswer: correctAnswer,
      correct: false,
      loading: false,
      answered: false,
      brains: null,
    };

    this.selectOption = this.selectOption.bind(this);
  }

  selectOption = (option: any) => {
    if (this.state.selectedOption !== option.id) {
      this.setState({selectedOption: option.id});
    }
  };

  saveAnswer = async () => {
    this.setState({...this.state, loading: true, answered: true});
    if (this.state.selectedOption) {
      const triviaService = new TriviaService();

      const triviaData = {
        trivia_id: this.props.route.params.trivia.trivia_id,
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
        brains: triviaResponse.brains_assigned,
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
