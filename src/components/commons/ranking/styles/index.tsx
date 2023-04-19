import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  ranking: {
    backgroundColor: '#fafafa',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  text: {
    fontFamily: 'Nunito',
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 22,
    color: '#e94044',
    fontFamily: 'Nunito-Bold',
    marginBottom: 16,
  },
  separator: {
    flex: 1,
    backgroundColor: '#f7e6e6',
    marginBottom: 8,
    height: 10,
    marginHorizontal: -22,
    alignItems: 'center',
  },
  separatorDots: {
    color: '#e94044',
    fontSize: 24,
    lineHeight: 20,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    marginRight: 8,
    borderWidth: 3,
    borderColor: '#e94044',
    width: 40,
    height: 40,
  },
  rankItemText: {
    flex: 1,
    fontSize: 18,
    color: '#061946',
    fontFamily: 'Nunito-Bold',
  },
  rankItemPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
});
