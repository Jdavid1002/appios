import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '47%',
    height: 166,
    backgroundColor: '#ffffff',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 15,
    padding: 16,
    shadowColor: '#1e1b5a',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3.84,
  },
  touchable: {
    height: 166,
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {},
  emptyTipContainer: {
    marginHorizontal: 20,
  },
  emptyTipMessage: {
    fontSize: 18,
    marginBottom: 20,
  },
});
