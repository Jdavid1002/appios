import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  textTitle: {
    color: '#f3c744',
    fontSize: 23,
    fontFamily: 'Nunito-ExtraBold',
    marginBottom: 20,
  },
  container: {
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f3c744',
    borderRadius: 16,
    color: '#8e6f0f',
    flex: 1,
    width: 135,
    height: 120,
    paddingTop: 20,
    paddingBottom: 16,
    marginBottom: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  tymCardItemImage: {
    marginBottom: 5,
    width: 55,
    height: 53,
  },
  tymCardItemText: {
    color: '#8e6f0f',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  brainContainer: {
    position: 'absolute',
    color: '#ffffff',
    left: 10,
    top: 15,
  },
  brainImage: {
    width: 16,
    height: 20,
  },
  brainTextInfo: {
    fontFamily: 'Nunito',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#22abdf',
  },
});
