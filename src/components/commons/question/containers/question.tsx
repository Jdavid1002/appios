import React, {Component} from 'react';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {ScrollView, View, ActivityIndicator} from 'react-native';
import styles from '../styles/styles';
import mainStyles from '../../../../styles/MainStyles';

class Question extends Component<any> {
  state = {webViewHeight: 10, loading: true};

  componentDidMount = () => {
    this.setState({webViewHeight: 10, loading: true});
  };

  componentWillUnmount = () => {
    this.setState({webViewHeight: 10, loading: true});
  };

  onWebViewMessage = (event: WebViewMessageEvent) => {
    this.setState({webViewHeight: Number(event.nativeEvent.data) + 15});
  };

  render() {
    return (
      <>
        {this.state.loading === true ? (
          <ScrollView style={[mainStyles.container, {height: 800}]}>
            <ActivityIndicator size="large" color="#061946" />
          </ScrollView>
        ) : (
          <View />
        )}
        <WebView
          source={{
            html:
              '<html style="background-color: #f8f8f8; font-family:\'Nunito\'; color: #061946" ><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head> <style> img{max-width:100%; height:auto} body{max-width:100%; height:auto} table{max-width:100%; height:auto} </style><body style="background-color: #f8f8f8; color: #061946;" >' +
              this.props.innerHtml +
              '</body></html>',
          }}
          style={[styles.container, {height: this.state.webViewHeight}]}
          originWhitelist={['*']}
          onMessage={this.onWebViewMessage}
          onLoadEnd={() => this.setState({loading: false})}
          injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
          scalesPageToFit={false}
        />
      </>
    );
  }
}

export default Question;
