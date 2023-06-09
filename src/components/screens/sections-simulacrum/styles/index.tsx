import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  textTitle: {
    color: '#E94044',
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    fontStyle: 'normal',
    marginTop: 25,
    marginBottom: 25,
    fontWeight: 'bold',
    letterSpacing: 0.22,
    display: 'flex',
    flexDirection: 'row',
  },
  containerRight: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flex: 1,
    alignItems: 'center', // ignore this - we'll come back to it
    justifyContent: 'center', // ignore this - we'll come back to it
    flexDirection: 'row',
  },
  questionsInfo: {
    fontSize: 16,
    color: '#39B3E2',
    fontStyle: 'normal',
    fontFamily: 'Nunito-Bold',
    fontWeight: '300',
    letterSpacing: 0,
    paddingBottom: 20,
    paddingLeft: 16,
  },
  textInfo: {
    fontSize: 20,
    color: '#061946',
    marginBottom: 5,
    fontStyle: 'normal',
    fontFamily: 'Nunito-Bold',
    fontWeight: '800',
    letterSpacing: 0,
    paddingTop: 20,
    paddingLeft: 16,
  },
  checkIconContainer: {
    position: 'absolute',
    right: 10,
    top: 8,
    borderRadius: 100,
    borderColor: '#18DA6A',
    borderWidth: 2,
    width: 16,
    height: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  figureNumberCenter: {
    fontStyle: 'normal',
    fontSize: 48,
    fontFamily: 'Nunito-Bold',
    letterSpacing: 0,
    color: '#F8F8F8',
    paddingTop: 10,
    paddingLeft: 10,
  },
  containerText: {
    width: '80%',
  },
});
