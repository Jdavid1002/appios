import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

class QuestionExplanation extends Component<any> {
  state = {
    webViewHeight: 10,
    backgroundColor: '#ffff',
    color: '#ffff',
    loading: true,
  };

  componentDidMount = () => {
    this.setState({
      webViewHeight: 10,
      backgroundColor: '#ffff',
      color: '#ffff',
      loading: true,
    });
  };

  componentWillUnmount = () => {
    this.setState({
      webViewHeight: 10,
      backgroundColor: '#ffff',
      color: '#ffff',
      loading: true,
    });
  };

  onWebViewMessage = (event: WebViewMessageEvent) => {
    this.setState({webViewHeight: Number(event.nativeEvent.data)});
  };

  render() {
    let backgroundColor = '#e6ffd9';
    let colorText = '#7cb55f';

    if (this.props.correct === false) {
      backgroundColor = '#ffd8d9';
      colorText = '#e94044';
    }

    return (
      <>
        {this.state.loading === true ? (
          <ActivityIndicator size="large" color="#061946" />
        ) : (
          <View />
        )}
        <View style={{backgroundColor: backgroundColor, color: colorText}}>
          <WebView
            style={{
              height: this.state.webViewHeight,
              backgroundColor: backgroundColor,
            }}
            source={{
              html:
                `<html style="color: ${colorText}; font-family:'Nunito'; background-color: ${backgroundColor} " ><head><meta name="viewport" content="width=device-width, initial-scale=1.0"> <style> img{max-width:100%; height:auto} body{max-width:100%; height:auto} table{max-width:100%; height:auto} </style> </head><body style="color: ${colorText}" >` +
                this.props.explanation +
                '</body></html>',
            }}
            onMessage={this.onWebViewMessage}
            onLoadEnd={() => this.setState({loading: false})}
            injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
          />
        </View>
      </>
    );
  }
}

export default QuestionExplanation;
