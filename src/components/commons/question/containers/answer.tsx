import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {CustomText} from 'app_components/commons/customs/components/customComponents';

import styles from '../styles/styles-answer';

class QuestionAnswer extends Component<any> {
  state = {
    webViewHeight: 10,
    backgroundColor: '#ffff',
    borderColor: '#ffff',
  };

  componentDidMount = () => {
    this.setState({webViewHeight: 10});
  };

  componentWillUnmount = () => {
    this.setState({webViewHeight: 10});
  };

  onWebViewMessage = (event: WebViewMessageEvent) => {
    this.setState({webViewHeight: Number(event.nativeEvent.data)});
  };

  handelPress = () => {
    this.props.onPressAnswer(this.props.id);
  };

  render() {
    let backgroundColor = '#ffff';
    let borderColor = '#ffff';

    if (this.props.selected === true) {
      backgroundColor = '#f0f4ff';
      borderColor = '#cfd2dc';
    }

    return (
      <TouchableOpacity onPress={this.handelPress}>
        <View
          style={[
            styles.item,
            {backgroundColor: backgroundColor, borderColor: borderColor},
          ]}>
          <CustomText
            style={[styles.letter, {backgroundColor: backgroundColor}]}>
            {' '}
            {this.props.letter}.{' '}
          </CustomText>
          <WebView
            style={{height: this.state.webViewHeight}}
            source={{
              html:
                `<html style="color: #061946; font-family:'Nunito'; background-color: ${backgroundColor} " ><head><meta name="viewport" content="width=device-width, initial-scale=1.0"> <style> img{max-width:100%; height:auto} body{max-width:100%; height:auto} table{max-width:100%; height:auto} </style> </head><body style="color: #061946" >` +
                this.props.title +
                '</body></html>',
            }}
            onMessage={this.onWebViewMessage}
            onLoadEnd={() => this.setState({loading: false})}
            injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default QuestionAnswer;
