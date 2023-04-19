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
		color: '#e94044',
		fontWeight: '800',
		fontSize: 22,
		textAlign: 'center',
	},
	text: {
		color: '#061946',
		fontSize: 17,
		margin: 10,
		textAlign: 'center'
	},
	textBold: {
		fontWeight: 'bold'
	},
	starContainer: {
		flexDirection: 'row',
		marginBottom: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	star: {
		width: 50,
		height: 50,
		marginHorizontal:10
	}
});
