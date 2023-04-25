import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  triviaCard: {
    flex: 1,
    padding: 16,
    marginBottom: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    overflow: 'hidden',
    minHeight: 120,
  },
  image: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  container: {flex: 1, alignItems: 'center'},
  topLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Nunito-ExtraBold',
    textAlign: 'left',
    color: '#051845',
    flexGrow: 1,
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
  subtitle: {
    color: '#767676',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginRight: 85,
  },
  button: {
    backgroundColor: '#75bb53',
    elevation: 0,
    shadowOffset: {width: 0, height: 0},
    minWidth: 200,
    maxWidth: 250,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 16,
    alignItems: 'center',
    flexDirection : 'row',
  },
  buttonText: {
    fontFamily: 'Nunito-ExtraBold',
    textTransform: 'capitalize',
    fontSize: 14,
    color: 'white',
  },
});
