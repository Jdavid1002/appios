import React, {Component} from 'react';

import {connect} from 'react-redux';

import Layout from 'app_components/screens/home/components/home-layout';

class Home extends Component<any, any> {
  render() {
    return <Layout {...this.props} />;
  }
}

export default connect(null)(Home);
