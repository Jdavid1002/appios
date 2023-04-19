import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  containerSimple: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    height: 76,
    paddingVertical: 24,
    // marginHorizontal: 20,
  },
  containerLoading: {
    backgroundColor: '#6A7590',
    borderRadius: 15,
    height: 76,
    paddingVertical: 24,
    // marginHorizontal: 20,
  },
  loadingTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  loadingDescription: {
    fontSize: 14,
    fontFamily: 'Nunito',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    fontWeight: "800",
    fontStyle: 'normal'
  },
  containerRight: {
    marginRight: 20,
    alignItems:'flex-end',
    justifyContent: 'center'
  },
  cardImageLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 150,
    height: 76,
    borderRadius: 15,
  },
  textInfo: {
    fontFamily: 'Nunito',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#22abdf',
  },
  brainImage:{
    width: 13,
    height: 15,
  }
});
