import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f8f8f8',
  },
  wrapper: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#061946',
    letterSpacing: 0.16,
    marginBottom: 4,
  },
  titleContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Nunito-Regular',
  },
  gameTitle: {
    fontSize: 32,
    color: '#e94044',
    fontFamily: 'Nunito-Bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  gameList: {
    width: '100%',
    paddingVertical: 20,
  },
  gameListContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    marginHorizontal: -10,
  },
  gameListHeader: {
    alignItems: 'center',
  },
  gameListItem: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    borderRadius: 4,
    marginBottom: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  gameListItemImage: {
    marginBottom: 16,
    width: 80,
    height: 80,
  },
  gameListItemTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  gameImage: {
    marginBottom: 16,
    width: 120,
    height: 120,
  },
  instructionStep: {
    width: '100%',
    marginBottom: 12,
    borderBottomColor: '#061946',
    borderBottomWidth: 1,
  },
  instructionStepTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  instructionStepText: {
    width: '100%',
    textAlign: 'left',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#39b3e2',
    marginVertical: 32,
  },
  feedBackIconContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 40,
    marginBottom: 16,
  },
  feedBackIcon: {
    fontSize: 64,
  },
});
