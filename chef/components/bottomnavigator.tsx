import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class BottomNavigator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rectangle}>
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
    width: '80%',
    height: 60,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});

export {BottomNavigator};
