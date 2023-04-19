import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  fabButton: {
    backgroundColor: '#e94044',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabButtonContainer: {
    borderRadius: 28,
    overflow: 'hidden',
    zIndex: 1000,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(2,10,27,.85)',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalBottomWrapper: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 80,
    position: 'relative',
  },
  modalBottomWrapperTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#061946',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalContainerTriangle: {
    backgroundColor: 'white',
    borderRadius: 3,
    width: 20,
    height: 20,
    position: 'absolute',
    bottom: -8,
    right: 18,
    transform: [{rotate: '45deg'}],
  },
});
