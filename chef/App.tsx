import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import styles from './AppStyles';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Ultifood</Text>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
