import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 32,
  },
  listContainer: {
    backgroundColor: '#F8F8F8',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: 'rgba(0, 0, 0, 0.16)',
    borderBottomWidth: 1,
  },
  mainText: {
    color: '#061946',
    fontSize: 15,
    fontFamily: 'Nunito-Bold',
  },
  subText: {
    color: '#061946',
    fontSize: 12,
  },
  addCenter: {
    padding: 20,
    backgroundColor: '#39B3E2',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  addCenterText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 15,
    color: '#E94044',
    fontFamily: 'Nunito-Bold',
  },
  message: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#061946',
    fontSize: 15,
    backgroundColor: '#F8F8F8',
  },
});
