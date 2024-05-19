import { StyleSheet, useColorScheme } from 'react-native';
import { Recommended } from './components/home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommended: {
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
    //borderRadius: 10,
    //backgroundColor: 'orange',
    marginLeft:10,
    marginRight:10,
    //position: 'relative',
  },
  recommendedoverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffaa59',
    opacity: 0.5,
    borderRadius: 10,
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
