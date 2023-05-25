import React from 'react';
import {View, StyleProp, ViewStyle, useWindowDimensions} from 'react-native';
import {styles} from './../index';
import { HtmlCleaner} from './../utils';
import RenderHTML from 'react-native-render-html';

interface InlineWebViewProps {
  html: string;
  css?: string;
  style?: StyleProp<ViewStyle>;
}

const InlineWebView: React.FC<InlineWebViewProps> = props => {

  const { width } = useWindowDimensions();

  const source = {
    html : HtmlCleaner(props.html)
  }
  
  return (
    <View style={[props.style]} pointerEvents="none">
      <RenderHTML
        contentWidth={width}
        source={source}
        baseStyle={styles.webviewContainer}
        tagsStyles={
          {
            p : {fontFamily : 'Nunito', fontSize : 18, color : '#061946', fontWeight : "800"}, 
            span : {fontFamily : 'Nunito', fontSize : 18, color : '#061946', fontWeight : "800"}, 
            li : {fontFamily : 'Nunito', fontSize : 14, color : '#061946', fontWeight : "800"}, 
            ol : {fontFamily : 'Nunito', fontSize : 14, color : '#061946', fontWeight : "800"}, 
            div : {fontFamily : 'Nunito', fontSize : 18, color : '#061946', fontWeight : "800"}, 
            img : {maxWidth : width - 50, height : 'auto'},
            td : {borderWidth : 1, borderColor : '#061946', padding : 5},
            table : {width : '100%'}
          }
        }
      />
    </View>
  );
};

export default React.memo(InlineWebView);
