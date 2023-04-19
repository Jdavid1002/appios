import React from 'react';
import {connect} from 'react-redux';

import SimulacrumService from 'app_services/simulacrum/simulacrum';

import {DailyQuestionCardLayout} from './../index';

class DailyQuestionCard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.getDailyQuestions = this.getDailyQuestions.bind(this);
  }

  componentDidMount() {
    this.getDailyQuestions();
  }

  getDailyQuestions = async () => {
    const simulacrumService = new SimulacrumService();

    simulacrumService.getDailyQuestion(
      this.props.auth_token,
      this.props.dispatch,
    );
  };

  render() {
    return (
      <DailyQuestionCardLayout
        data={this.props.dailyQuestion}
        getDailyQuestion={this.getDailyQuestions}
      />
    );
  }
}

function mapStatesToProps(state: any = {}) {
  return {
    dailyQuestion: state.dailyQuestion,
    auth_token: state.auth.user.token,
  };
}
export default connect(mapStatesToProps)(DailyQuestionCard);
