import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from 'nativewind';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'


function BottomNavigator(){
  const {colorScheme, setColorScheme} = useColorScheme();
  const [bgColorsemicircle, setbgColorsemicircle] = useState(colorScheme === 'dark' ? '#111827' : '#d1d5db');
  const [bgColorrectangle, setbgColorrectangle] = useState(colorScheme === 'dark' ? '#374151' : '#eff0f4')
  const [coloricons, setcoloricons] = useState(colorScheme === 'dark' ? '#ffdec4' : 'black')
  const [key, setKey] = useState(0);

  useEffect(() => {
    setbgColorsemicircle(colorScheme === 'dark' ? '#111827' : '#d1d5db');
    setbgColorrectangle(colorScheme === 'dark' ? '#374151' : '#eff0f4');
    setcoloricons(colorScheme === 'dark' ? '#ffdec4' : 'black');
  }, [colorScheme]);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.rectangle, backgroundColor: bgColorrectangle}}></View>
      <View style={{ ...styles.semicircle, backgroundColor: bgColorsemicircle }}></View>
      <View style={styles.circle}></View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonGroup}>
        <FontistoIcon name="home" style={{ ...styles.icon, left:20, color:coloricons}} />
        <FeatherIcon name="heart" style={{ ...styles.icon, left:90, color:coloricons}} />
        <FeatherIcon name="book-open" style={{ ...styles.icon, right:90, color:coloricons}} />
        <FontAwesomeIcon name="user" style={{ ...styles.icon, right:20, color:coloricons}} />
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
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  icon: {
    position: 'absolute',
    fontSize: 20,
    bottom:9,
    zIndex: 1,
  }
});

export {BottomNavigator};
