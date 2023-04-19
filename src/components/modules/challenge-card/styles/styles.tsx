import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    alignItems: 'center',
    height: 134,
    paddingVertical: 24,
    flex: 1,
    resizeMode: 'contain',
    // marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Nunito-ExtraBold',
    height: 54,
    textAlign: 'center',
  },
  textDescription:{
    fontSize: 12,
    fontFamily: 'Nunito',
  },
  progressBackground: {
    width: '50%',
    height: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    borderRadius: 10,
  },
  button: {
    height: 31,
    borderRadius: 15,
    justifyContent: 'center',
    width: 300
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 13,
    fontFamily: 'Nunito-ExtraBold',
  }
});
