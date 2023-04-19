import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  container: {
  	width:'48%',
  	height: 166,
  	backgroundColor: '#ffff',
  	marginTop: 0,
  	marginBottom: 5,
  	marginRight: 5,
  	marginLeft: 5,
    borderRadius: 15,
    padding: 10,
	},
	touchable: {
    height: 146,
    display: 'flex',
    justifyContent: 'flex-end'
	},
  image: {
    position: 'absolute',
	  left: 0,
	  top: 0,
    width: '100%',
	  height: '50%',
	  borderRadius: 15,
	},
  text: {
  	textAlign: 'right',
  	marginTop: 0,
  	fontSize: 18,
  	fontFamily: 'Nunito-ExtraBold',
  	marginRight: 5,
    marginLeft: 20
  }
});
