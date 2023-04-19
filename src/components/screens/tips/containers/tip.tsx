import React, {Component, Fragment} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';

import HowIFeel from 'app_components/commons/how-i-feel';
import {TipNew, TipVideo} from 'app_components/modules/tips';

import mainStyles from 'app_styles/MainStyles';

class TipScreen extends Component<any, any> {
  private tip: any = null;
  private Components: any = {
    new: TipNew,
    video: TipVideo,
  };

  constructor(props: any) {
    super(props);

    this.tip =
      this.props.route.params && this.props.route.params.tip
        ? this.props.route.params.tip
        : {};
  }

  componentDidMount = () => {
    if (!this.Components.hasOwnProperty(this.tip.type)) {
      this.props.navigation.goBack();
    }
  };

  render = () => {
    return (
      <Fragment>
        <ScrollView style={[mainStyles.container]}>
          {this.Components.hasOwnProperty(this.tip.type) &&
            React.createElement(this.Components[this.tip.type], {
              tip: this.tip,
            })}
        </ScrollView>
        <HowIFeel screen="section_tip_page" />
      </Fragment>
    );
  };
}

export default connect(null)(TipScreen);
