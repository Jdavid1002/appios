import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {paddingHorizontal: 20, paddingVertical: 20},
  toolbar: {
    marginBottom: 16,
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'row',
  },
  sudokuContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    color: '#f3c744',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Nunito-Bold',
  },
  defaultCell: {
    flexGrow: 1,
    position: 'relative',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: '#39b3e2',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  defaultCellInput: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Nunito-Bold',
    color: '#39b3e2',
  },
  defaultCellText: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#061946',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Nunito-Bold',
  },
});
