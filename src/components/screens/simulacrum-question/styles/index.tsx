import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  responseOptionTitle: {
    fontFamily: 'Nunito-Bold',
    color: '#061946',
    fontSize: 20,
  },
  responseOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    // marginBottom: 16,
    borderWidth: 1,
    borderColor: 'white',
  },
  responseSelectedOption: {
    backgroundColor: '#f0f4ff',
    borderColor: '#cbd1e3',
  },
  webview: {
    backgroundColor: 'transparent',
    flex: 0,
  },
});
