import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    top: '50%',
    width: '55%',
    resizeMode: 'contain',
  },
  logotext: {
    top: -177,
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
