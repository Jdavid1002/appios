import React, {Component} from 'react';
import {View, ActivityIndicator, ScrollView, Image} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {CustomText} from 'app_components/commons/customs/components/customComponents';

import mainStyles from 'app_styles/MainStyles';
import {TipNewStyles} from 'app_components/modules/tips';

class TipNew extends Component<any, any> {
  private tip: any = null;
  state = {webViewHeight: 10, loading: true};
  constructor(props: any) {
    super(props);

    this.tip = this.props.tip ? this.props.tip : {};
  }

  componentDidMount = () => {
    this.setState({webViewHeight: 10, loading: true});
  };

  componentcomponentWillUnmountWi = () => {
    this.setState({webViewHeight: 10, loading: false});
  };

  onWebViewMessage = (event: WebViewMessageEvent) => {
    this.setState({webViewHeight: Number(event.nativeEvent.data) + 15});
  };
  render = () => {
    return (
      <View style={TipNewStyles.container}>
        {this.tip.hasOwnProperty('image_path') && this.tip.image_path !== '' && (
          <Image
            style={TipNewStyles.image}
            source={{
              uri: this.tip.image_path,
            }}
          />
        )}
        <CustomText style={TipNewStyles.title}>{this.tip.name}</CustomText>
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
              this.tip.content +
              '</body></html>',
          }}
          style={[
            TipNewStyles.webViewContainer,
            {height: this.state.webViewHeight},
          ]}
          originWhitelist={['*']}
          onMessage={this.onWebViewMessage}
          onLoadEnd={() => this.setState({loading: false})}
          injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
          scalesPageToFit={false}
        />
      </View>
    );
  };
}

export default TipNew;
