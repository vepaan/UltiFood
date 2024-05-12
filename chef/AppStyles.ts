import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    //borderWidth: 1,
    //borderColor: 'black',
    //borderStyle: 'solid',
  },
  logo: {
    top: 436,
    width: 215,
    resizeMode: 'contain',
  },
  logotext: {
    top: -125,
    width: '60%',
    resizeMode: 'contain',
  },
  loadingtext: {
    position: 'absolute',
    //fontFamily: 'Staatliches-Regular',
    color: '#000',
    top: '70%',
    fontSize: 20,
  }
});

export default styles;
