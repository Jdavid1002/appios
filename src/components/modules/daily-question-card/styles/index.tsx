import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  dailyQuestionCard: {
    flex: 1,
    padding: 16,
    marginBottom: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Nunito-ExtraBold',
    textAlign: 'left',
    color: '#051845',
    marginBottom: 16,
  },
  brains: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  brainsText: {
    color: '#24abdf',
    fontSize: 10,
    fontFamily: 'Nunito-Bold',
  },
  text: {
    color: '#767676',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#75bb53',
    elevation: 0,
    shadowOffset: {width: 0, height: 0},
    minWidth: 200,
    maxWidth: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems : 'center',
    paddingVertical : 2,
    borderRadius: 16,
  },
  buttonText: {
    fontFamily: 'Nunito-ExtraBold',
    textTransform: 'capitalize',
    fontSize: 14,
    color : 'white'
  },
});
