import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F8F8F8',
  },
  formContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 40,
  },
  facebookButton: {
    flexDirection: 'row',
    backgroundColor: '#39B3E2',
    borderRadius: 25,
    padding: 13,
    marginTop: 48,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookButtonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    marginLeft: 5,
  },
  textBlue: {
    color: '#061946',
    fontSize: 18,
    fontFamily: 'Nunito-ExtraBold',
  },
});
