import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    height: 270,
    marginLeft: -20,
    marginRight: -20,
    marginTop: -27,
    marginBottom: 25,
    resizeMode: 'cover',
    flex: 1,
    borderRadius: 30 / 2,
    overflow: 'hidden',
  },
  webViewContainer: {
    backgroundColor: '#f8f8f8',
    fontFamily: 'Nunito',
  },
});
