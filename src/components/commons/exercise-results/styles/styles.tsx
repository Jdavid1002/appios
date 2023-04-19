import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wraper: {
    flex: 1,
    alignItems:'center',
  },
  title: {
    fontSize:32,
    fontWeight: "bold",
    color:"#e94044",
    marginTop:10,
  },
  img: {
    width: 78,
    height: 87,
    resizeMode: 'contain',
    marginTop:25,
  },
  brainsNumber: {
    fontSize:70,
    fontFamily: 'Nunito-Bold',
    fontWeight: 'bold',
    color:"#8ec772",
    marginTop:25,
  },
  boxContainer: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'flex-start',
    borderColor:'#8ec772',
    borderBottomWidth: 1,
    marginTop: 30,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 10,
  },
  boxLeftContainer: {
    minWidth: 100,
  },
  boxRightContainer:{
    minWidth: 10,
    position:'absolute',
    right:15
  },
  textBlue: {
    color: '#061946',
    fontSize: 17,
    fontWeight: "bold",
  },
  textCyan: {
    color: '#39b3e2',
    fontSize:17
  },
  buttonWraper: {
    marginTop: 50,
    height: 46,
    borderRadius: 25,
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: '#39b3e2',
    height: 46,
    marginBottom: 60,
  },
  textbutton: {
    fontSize: 22,
    fontFamily: 'Nunito-ExtraBold',
    color: '#ffff',
  }
});
