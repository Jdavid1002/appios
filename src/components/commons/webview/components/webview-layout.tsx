import React from 'react';
import {StyleProp, ViewStyle, useWindowDimensions} from 'react-native';
import RenderHTML from 'react-native-render-html';

interface InlineWebViewProps {
  html: string;
  css?: string;
  style?: StyleProp<ViewStyle>;
}

const InlineWebView: React.FC<InlineWebViewProps> = props => {

  const { width } = useWindowDimensions();

  const source = {
    html : props?.html
  }

  const renderersProps = {
    img: {
      enableExperimentalPercentWidth: true
    }
  };

  
  return (
    <RenderHTML
      contentWidth={width}
      source={source}
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
      renderersProps={renderersProps}
    />
  );
};

export default React.memo(InlineWebView);
