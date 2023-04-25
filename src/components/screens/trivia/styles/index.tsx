import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  trivia: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    color: '#e94044',
  },
  webview: {
    backgroundColor: 'transparent',
    flex: 0,
  },
  inlineWebview: {
    marginVertical: 16,
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
  responseOptionTitle: {
    fontFamily: 'Nunito-ExtraBold',
    color: '#061946',
    marginBottom: 8,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#061946',
    elevation: 0,
    shadowOffset: {width: 0, height: 0},
    justifyContent : 'center',
    alignItems : 'center',
    width : '100%',
    paddingVertical : 5,
    borderRadius : 16
  },
  buttonText: {
    fontFamily: 'Nunito-ExtraBold',
    textTransform: 'capitalize',
    fontSize: 18,
    color : 'white'
  },
});
