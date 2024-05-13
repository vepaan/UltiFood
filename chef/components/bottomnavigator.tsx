import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class BottomNavigator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rectangle}>
          <View style={styles.cutout}></View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonGroup}>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center', // Center horizontally
  },
  rectangle: {
    width: '100%',
    height: 60,
    backgroundColor: '#2196F3',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cutout: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 70,
    top: -20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    //paddingHorizontal: 15,
    //paddingVertical: 10,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
});

export {BottomNavigator};
