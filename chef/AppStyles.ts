import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    width: '55%',
    resizeMode: 'contain',
  },
  logotext: {
    top: '17%',
    position: 'absolute',
    width: '60%',
    resizeMode: 'contain',
  },
  loadingtext: {
    position: 'absolute',
    //fontFamily: 'Staatliches-Regular',
    color: '#000',
    top: '70%',
    fontSize: 20,
    resizeMode: 'contain',
  }
});

export default styles;
