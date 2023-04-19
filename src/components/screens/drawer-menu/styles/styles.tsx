import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginLeft: 25,
    marginTop: 15,
    marginBottom: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIamge: {
    position: 'absolute',
    right: 0,
    marginTop: 10,
    marginRight: 15,
    height: 80,
    width: 160,
    resizeMode: 'contain'
  },
  itemContainer: {
    marginLeft: 30,
    marginTop: 15,
    marginBottom: 10,
  },
  itemText: {
    fontFamily: 'Nunito-Bold',
    color: '#ffffff',
    fontSize: 25,
  },
  footer: {
    marginTop: 15,
    backgroundColor: '#03102f',
    paddingBottom: 15,
    paddingTop: 10,
    paddingLeft: 30,
    borderBottomRightRadius: 10,
  },
});
