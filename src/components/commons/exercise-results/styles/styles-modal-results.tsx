import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wraper: {
    flex: 1,
    alignItems:'center',
  },
  title: {
    color: '#e94044',
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center'
  },
  acordion: {
    borderWidth: 0
  },
  acordionHeader: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    marginTop: 20,
    borderWidth: 0,
    alignItems: "center" ,
  },
  acordionHeaderNumber: {
    flex: 0.1,
    fontSize: 25,
    paddingHorizontal: 10,
    color: '#061946'
  },
  acordionHeaderCenter: {
    flex: 0.8,
  },
  acordionHeaderText: {
    color: '#061946'
  },
  acordionHeaderIcon: {
    flex: 0.1,
    fontSize: 18,
    marginHorizontal: 0,
    color: '#061946'
  },
  acordionExplanation: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  acordionExplanationTitle: {
    fontWeight: 'bold'
  }

});
