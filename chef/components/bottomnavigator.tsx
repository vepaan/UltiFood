import { setBackgroundColorAsync } from 'expo-navigation-bar';
import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from 'nativewind';
import { ThemeToggle } from './home';

function BottomNavigator(){
  const {colorScheme, setColorScheme} = useColorScheme();
  const [bgColor, setbgColor] = useState(colorScheme === 'dark' ? '#111827' : '#d1d5db');
  const [key, setKey] = useState(0);

  useEffect(() => {
    setbgColor(colorScheme === 'dark' ? '#111827' : '#d1d5db');
  }, [colorScheme]);

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}></View>
      <View style={{ ...styles.semicircle, backgroundColor: bgColor }}>
      </View>
      <View style={styles.circle}></View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonGroup}>
        </View>
      </View>
    </View>
  );
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
    //opacity: 0.6,
  },
  semicircle: {
    position: 'absolute',
    height: 48,
    width: 87,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    bottom: 12,
    zIndex: 2,
  },
  circle: {
    position: 'absolute',
    height: 75,
    width: 75,
    borderRadius: 90,
    bottom: 17.5,
    backgroundColor: '#ffdec4',
    zIndex:2,
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
