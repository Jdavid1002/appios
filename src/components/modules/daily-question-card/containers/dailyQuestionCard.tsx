import React from 'react';
import {connect} from 'react-redux';

import SimulacrumService from '../../../../services/simulacrum/simulacrum';

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
    await simulacrumService.getDailyQuestion(this.props.auth_token, this.props.dispatch, this.props.alliance_id, this.props.user_id);
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
    auth_token: state?.auth?.user?.token,
    user_id: state?.auth?.user?._id,
    alliance_id: state?.auth?.user?.alliance_id,
  };
}
export default connect(mapStatesToProps)(DailyQuestionCard);
