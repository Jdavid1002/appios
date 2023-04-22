import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {styles} from '../index';

interface InlineWebViewProps {
  html: string;
  style?: any;
}

const InlineWebView: React.FC<InlineWebViewProps> = props => {
  const [webViewHeight, setWebViewHeight] = React.useState<number>(0);

  const onWebViewMessage = (event: WebViewMessageEvent) => {
    setWebViewHeight(Number(event.nativeEvent.data) + 10);
  };

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `El componente ("src/components/screens/trivia/components/inlineWebview")
        es obsoleto, usar "src/components/commons/webview" en su lugar`,
      );
    }
  }, []);

  return (
    <View style={[props.style]}>
      {webViewHeight === 0 && <ActivityIndicator />}
      <WebView
        style={[styles.webview, {flex: 0, height: webViewHeight}]}
        containerStyle={[{flex: 0, height: webViewHeight}]}
        onMessage={onWebViewMessage}
        textZoom={100}
        source={{
          html: `
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
              <style>
                *,
                *::before,
                *::after {
                  box-sizing: border-box;
                }

                body, h1, h2, h3, h4, p, ul[class], ol[class], li, figure, figcaption, blockquote, dl, dd {
                  margin: 0;
                }

                #content {
                  font-size: 18;
                  color: #061946
                }

              </style>
              </head>
            <body>
              <main id="content">
                ${props.html}
              </main>
            </body>
          </html>`,
        }}
        scrollEnabled={false}
        injectedJavaScript="setTimeout(function(){window.ReactNativeWebView.postMessage(document.getElementById('content').scrollHeight)}, 300)"
      />
    </View>
  );
};

export default React.memo(InlineWebView);
