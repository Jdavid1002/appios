import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import {WebviewLayout} from './../index';

interface WebviewProps {
  html: string;
  css?: string;
  style?: StyleProp<ViewStyle>;
}

class Webview extends React.Component<WebviewProps> {
  render() {
    return <WebviewLayout {...this.props} />;
  }
}

export default Webview;
