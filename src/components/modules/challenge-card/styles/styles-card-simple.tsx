import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  containerSimple: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    height: 76,
    paddingVertical: 7,
  },
  containerLoading: {
    backgroundColor: '#6A7590',
    borderRadius: 15,
    height: 76,
    paddingVertical: 24,
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
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    fontWeight: "800",
    fontStyle: 'normal',
    width : '60%',
    textAlign : 'right'
  },
  containerRight: {
    marginRight: 12,
    flex : 1,
    alignItems:'flex-end',
    justifyContent : 'space-between',
    flexDirection : 'column',
    gap : 2,
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
  },
  containerBrain: {
    alignItems:'flex-end',
    justifyContent: 'center',
    flexDirection : 'row',
    gap : 3
  }
});
