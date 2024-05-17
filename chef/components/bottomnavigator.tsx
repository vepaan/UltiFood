import { setBackgroundColorAsync } from 'expo-navigation-bar';
import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from 'nativewind';
import { ThemeToggle } from './home';

function BottomNavigator(){
  const {colorScheme, setColorScheme} = useColorScheme();
  const [bgColorsemicircle, setbgColorsemicircle] = useState(colorScheme === 'dark' ? '#111827' : '#d1d5db');
  const [bgColorrectangle, setbgColorrectangle] = useState(colorScheme === 'dark' ? '#374151' : '#eff0f4')
  const [key, setKey] = useState(0);

  useEffect(() => {
    setbgColorsemicircle(colorScheme === 'dark' ? '#111827' : '#d1d5db');
    setbgColorrectangle(colorScheme === 'dark' ? '#374151' : '#eff0f4');
  }, [colorScheme]);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.rectangle, backgroundColor: bgColorrectangle}}></View>
      <View style={{ ...styles.semicircle, backgroundColor: bgColorsemicircle }}>
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
    alignItems: 'center',
  },
  rectangle: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  semicircle: {
    position: 'absolute',
    height: 43,
    width: 87,
    borderBottomLeftRadius: 43,
    borderBottomRightRadius: 43,
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
