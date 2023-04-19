import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Nunito-Regular',
    marginBottom: 20,
  },
  levelText: {
    fontSize: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Nunito-ExtraBold',
    marginBottom: 20,
    color: '#061946',
  },
  timer: {
    fontSize: 48,
    color: '#f3c744',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Nunito-Bold',
  },
  helpText: {
    fontSize: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Nunito-Bold',
    marginBottom: 16,
    color: '#39b3e2',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#d5eef8',
    width: '100%',
    padding: 16,
    borderRadius: 8,
  },
  thumbnail: {
    backgroundColor: '#eee',
    borderColor: '#f3c744',
    borderWidth: 2,
    marginHorizontal: 5,
    width: 80,
    height: 80,
    borderRadius: 60,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#39b3e2',
  },
  buttonText: {
    textTransform: 'capitalize',
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
  },
});
