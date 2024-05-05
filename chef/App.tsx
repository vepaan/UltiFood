import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, Pressable, Animated, Easing, StyleSheet } from "react-native";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Loading, ThemeToggle } from "./components/home";
import styles from './AppStyles';
import * as NavigationBar from 'expo-navigation-bar';
import * as Font from 'expo-font'; 

//const textArray = ['Burning Calories','Synthesizing Proteins','Improving Nutrition', 'Optimizing Diet'];
const textArray = [];

export default function App() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [loading, setLoading] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current;
  const [displayText, setDisplayText] = useState('');
  const [dots, setDots] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Staatliches-Regular': require('./assets/fonts/Staatliches-Regular.ttf'),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);


  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#111827");
    NavigationBar.setVisibilityAsync("hidden");
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);
    NavigationBar.setBehaviorAsync("inset-swipe")
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      startSpinAnimation();
      startTextLoading();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = Math.floor(Math.random() * textArray.length);
      const text = textArray[currentIndex];
      setDisplayText(text);
    }, 1500); // Update text every 1 second
  
    return () => clearInterval(interval);
  }, []); // Run once on component mount
  

  const startSpinAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, { toValue: 1, duration: 1400, easing: Easing.linear, useNativeDriver: true, }),
        Animated.delay(900),
        Animated.timing(spinValue, { toValue: 0, duration: 0, useNativeDriver: true, })
      ])
    ).start();
  };

  const startTextLoading = () => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 1200);
    return () => clearInterval(interval);
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });

  return loading ? (
    <View style={{ flex: 1, backgroundColor: "#ffaa59", alignItems: "center", justifyContent: "center" }}>
      <Animated.Image
        source={require("./assets/logo.png")}
        style={[styles.logo, { transform: [{ translateX: -10 }, { translateY: -0 }, { rotate: spin }, { translateX: 10 }, { translateY: 0 }] }]}
      />
      <Image source={require("./assets/logotext.png")} style={styles.logotext}></Image>
      <Text style={styles.loadingtext}>{displayText}{dots}</Text>
    </View>
  ) : (
    <SafeAreaView className="flex-1 bg-gray-300 dark:bg-gray-900 items-center justify-center">
      <ThemeToggle />
      <Header />
    </SafeAreaView>
  );
}
