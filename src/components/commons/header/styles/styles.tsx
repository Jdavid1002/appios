import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#061946',
  },
  headerWrapperRounded: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 15,
    elevation: 3,
  },
  header: {
    height: 120,
    position : 'relative'
  },
  body: {
    flex: 1,
    flexGrow: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    flexShrink: 1,
    position : 'absolute',
    left : 10,
    top : 40
  },
  right: {
    flex: 1,
    flexShrink: 1,
    position : 'absolute',
    right : 10,
    top : 40
  },
  textTitle: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
  },
  textSubtitle: {
    fontFamily: 'Nunito-Regular',
    color: 'white',
  },
  avatar: {
    width: 28,
    height: 28,
    borderColor: 'rgba(255,255,255,.75)',
    borderWidth: 2,
  },
});
