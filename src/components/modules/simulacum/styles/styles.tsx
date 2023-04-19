import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    borderRadius: 20,
  },
  background: {
		backgroundColor: '#FFF',
		borderRadius: 20,
		alignItems: 'center',
		// minHeight: 277,
		// minWidth: 366,
		minHeight: 277,
		resizeMode: 'cover',
		paddingVertical: 15,
		paddingHorizontal: 20
	},
	wrapper: {
		flex: 1,
		flexDirection: 'row'
	},
	titleWrapper: {
		flex :1,
	},
	title: {
		textAlign: 'right',
		color:'#39b3e2',
		fontSize:13,
		fontWeight: 'bold',
		marginLeft: 50
	},
	subtitle: {
		textAlign:'justify',
		fontSize: 12,
		fontFamily: 'Nunito',
		color: "#061946",
		marginLeft: 85
	},
	labelContainer: {
		flex: 1,
		position: 'absolute',
		top: 60,
		maxWidth: 145,
		alignItems: 'flex-start'
	},
	chartContainer: {
		flex: 1,
		alignItems: 'flex-end',
	}
});