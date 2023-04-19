import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		paddingHorizontal: 30
	},
	wraper: {
		padding: 40,
		backgroundColor: '#ffff',
		borderRadius: 15
	},
	title: {
		color: '#8ec772',
		fontWeight: '800',
		fontSize: 22,
		textAlign: 'center'
	},
	text: {
		color: '#061946',
		fontSize: 17,
		margin: 10,
		textAlign: 'center'
	},
	brainsContainer: {
		flexDirection: 'row',
		marginBottom: 20,
		marginTop:20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	img: {
		width: 58,
		height: 67,
		resizeMode: 'contain',
		marginHorizontal: 10
	},
	brainsNumber: {
		fontSize:55,
		fontFamily: 'Nunito-Bold',
		fontWeight: '800',
		color:"#061946",
		marginHorizontal: 10
	},
});