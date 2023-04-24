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
  },
  containerHeader: {
    width : '100%',
    height : '100%',
    flexDirection: 'row',
    alignItems : 'center',
    paddingTop : 30
  },
  body: {
    width : '50%',
    alignItems : 'center'
  },
  left: {
    width : '25%',
    alignItems : 'center'
  },
  right: {
    width : '25%',
    alignItems : 'center'
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
