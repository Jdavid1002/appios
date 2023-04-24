import React, {Component, Fragment} from 'react';

import {Player} from '../../../../components/commons/player';

class TipVideo extends Component<any, any> {
  private tip: any = null;

  constructor(props: any) {
    super(props);

    this.tip = this.props.tip ? this.props.tip : {};
  }

  render = () => {
    return (
      <Fragment>
        <Player link={this.tip.content} />
      </Fragment>
    );
  };
}

export default TipVideo;
