import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 0.2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 10,
    borderRadius: 20,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    color: '#39b3e2',
    fontSize: 20,
    fontWeight: '800',
  },
  description: {
    fontFamily: 'Nunito-Bold',
    color: '#061946',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});
