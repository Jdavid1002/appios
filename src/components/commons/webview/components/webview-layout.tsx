import React from 'react';
import {ActivityIndicator, View, StyleProp, ViewStyle} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {styles} from './../index';
import {fontFace, normalize, HtmlCleaner} from './../utils';

interface InlineWebViewProps {
  html: string;
  css?: string;
  style?: StyleProp<ViewStyle>;
}

const InlineWebView: React.FC<InlineWebViewProps> = props => {
  const [webViewHeight, setWebViewHeight] = React.useState<number>(0);

  const onWebViewMessage = (event: WebViewMessageEvent) => {
    let height = Number(event.nativeEvent.data);

    if (height > 50) {
      height = height + 20;
    }

    setWebViewHeight(height);
  };

  return (
    <View style={[props.style]} pointerEvents="none">
      {webViewHeight === 0 && <ActivityIndicator />}
      <WebView
        style={[styles.webview, {height: webViewHeight}]}
        containerStyle={[styles.webviewContainer, {height: webViewHeight}]}
        onMessage={onWebViewMessage}
        textZoom={100}
        source={{
          html: `
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                <style>
                  ${fontFace('Nunito-Light', 'ttf', 'Nunito', 'lighter')}
                  ${fontFace('Nunito-Regular', 'ttf', 'Nunito', 'regular')}
                  ${fontFace('Nunito-Bold', 'ttf', 'Nunito', 'bold')}
                  ${fontFace('Nunito-ExtraBold', 'ttf', 'Nunito', 'bolder')}

                  ${normalize}

                  *,
                  *::before,
                  *::after {
                    box-sizing: border-box;
                    max-width: 100vw;
                  }
                  *:empty,
                  *:blank {
                    display: none;
                  }
                  img {
                    display: block;
                    max-width:95%;
                    width: auto;
                    height: auto;
                  }
                  table {
                    margin: 1rem 0;
                  }
                  #content {
                    font-size: 18;
                    color: #061946;
                    font-family: 'Nunito', sans-serif;
                    padding-right: .125rem;
                  }
                  ${props.css}
                </style>
              </head>
              <body>
                <main id="content">
                  ${HtmlCleaner(props.html)}
                </main>
              </body>
            </html>
          `,
        }}
        scrollEnabled={false}
        injectedJavaScript={`
          (function() {
            setTimeout(function() {
              const height = document.getElementById('content').scrollHeight;
              window.ReactNativeWebView.postMessage(height)
            }, 300)
          })();
        `}
      />
    </View>
  );
};

export default React.memo(InlineWebView);
