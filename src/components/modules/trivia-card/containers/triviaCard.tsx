import React from "react";
import { connect } from "react-redux";
import TriviaService from "app_services/trivia";
import { TriviaCardLayout } from "./../index";

class TriviaCard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.getTriviaData = this.getTriviaData.bind(this);
  }

  componentDidMount() {
    if (!this.props.trivia) {
      this.getTriviaData();
    }
  }

  getTriviaData = async () => {
    const triviaService = new TriviaService();
    await triviaService.getTrivia(this.props.auth_token, this.props.dispatch, this.props.alliance_id, this.props.user_id);
  };

  render() {
    return (
      <TriviaCardLayout
        trivia={this.props.trivia}
        getTriviaData={this.getTriviaData}
      />
    );
  }
}

function mapStatesToProps(state: any = {}) {
  return {
    trivia: state.trivia,
    auth_token: state?.auth?.user?.token,
    user_id: state?.auth?.user?._id,
    alliance_id: state?.auth?.user?.alliance_id,
  };
}
export default connect(mapStatesToProps)(TriviaCard);
