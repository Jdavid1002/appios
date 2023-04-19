import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 140,
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 5,
  },
  barWrapper: {
    flex: 1,
    width: 25,
    height: '80%',
    // align-items: flex-end;
    padding: 5,
  },
  bar: {
    // display: flex;
    // flex-direction: column-reverse;
    width: 25,
    height: '100%',
  },
  oval: {
    width: '100%',
    height: 10,
    backgroundColor: '#78af02',
    borderRadius: 100,
    zIndex: 2,
  },
  ovalTop: {
    marginBottom: -5,
    backgroundColor: 'green',
    zIndex: 2,
  },
  rect: {
    backgroundColor: '#78af02',
    // flex-grow: 1;
    marginBottom: -5,
    height: '50%',
  },
  rectShadow: {
    backgroundColor: '#f6f6f6',
    // flex-grow: 1;
    marginBottom: 0,
    height: '50%',
  },
  ovalShadow: {
    width: '100%',
    height: 10,
    borderRadius: 100,
    marginBottom: -5,
    backgroundColor: '#d9d9d9',
    zIndex: 2,
  },
  label: {
    fontSize: 11,
    marginHorizontal: 5,
    textAlign: 'center',
    color: '#061946',
  },
});
