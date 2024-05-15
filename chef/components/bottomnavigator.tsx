import React, { Component, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

class BottomNavigator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rectangle}></View>
        <View style={styles.semicircle}></View>
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
    width: '85%',
    height: 60,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    zIndex: 1,
  },
  semicircle: {
    position: 'absolute',
    height: 45,
    width: 80,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    bottom: 15,
    backgroundColor: '#111827',
    zIndex: 2,
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
