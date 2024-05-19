import React from 'react';
import { View, StyleSheet } from 'react-native';
import Scanner from './scanner';

function ScannerScreen() {
  return (
    <View style={styles.container}>
      <Scanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScannerScreen;
