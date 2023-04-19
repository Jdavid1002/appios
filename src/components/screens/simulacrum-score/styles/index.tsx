import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  },
  titleScore: {
    color: '#E94044',
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    fontStyle: 'normal',
    marginTop: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    letterSpacing: 0.22,
    display: 'flex',
    flexDirection: 'row',
  },
  descriptionScore: {
    fontFamily: 'Nunito-light',
    color: '#061946',
    letterSpacing: 0.14,
    fontStyle: 'normal',
    fontSize: 14
  },
  nextButton: {
    height: 52,
    width: '100%',
  },
  textButton: {
    fontSize: 18
  },
  image: {
    width: '90%',
    marginLeft: 20,
    marginBottom: 50,
    marginTop: 50
  }
})
