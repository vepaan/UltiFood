import { StyleSheet } from 'react-native';
import { Recommended } from './components/home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommended: {
    borderColor: 'white',
    borderWidth: .5,
    borderStyle: 'solid',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    width: 250,
    height: 130,
    left:-10,
  },
  filter: {
    width: 250,
    height: 130,
    borderRadius: 10,
    backgroundColor: 'orange',
    marginLeft:10,
    marginRight:10,
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
  },
});

export default styles;
