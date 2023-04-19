import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#061946',
  },
  text: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: 'white',
    lineHeight: 28,
    marginBottom: 32,
  },
  logo: {
    marginBottom: 64,
  },
  kuepaLabel: {
    alignSelf: 'flex-end',
    width: 180,
    resizeMode: 'contain'
  },
});
