import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  item: {
    borderRadius: 4,
    shadowColor: "#000",
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    flex: 1,
    flexDirection: 'row'
  },
  letter: {
  	color: '#061946',
  	fontSize: 20,
  	fontWeight: '800',
    fontFamily: 'Nunito',
  }
});