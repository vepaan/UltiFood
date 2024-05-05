import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, Pressable, Animated, Easing } from "react-native";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Loading, ThemeToggle } from "./components/home";
import styles from './AppStyles';


const textArray = ['Burning Calories', 'Synthesizing Proteins', 'Building Muscle']

export default function App() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [loading, setLoading] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current;
  const [displayText, setDisplayText] = useState('');
  const [dots, setDots] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(loading+1);});
      return () => clearTimeout(timer);}, [loading]);

  useEffect(() => {
    if (loading) {
      startSpinAnimation();
    }
  }, []); // Re-trigger effect when loading state changes

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = Math.floor((new Date().getTime() / 1000) % textArray.length);
      const text = textArray[currentIndex];
      setDisplayText(text);
    }, 1000); // Update text every 1 second
  
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
      <Text style={{ color: '#000', fontSize: 30, fontFamily:'sans', marginTop: 20 }}>{displayText}{dots}</Text>
    </View>
  ) : (
    <SafeAreaView className="flex-1 bg-gray-300 dark:bg-gray-900 items-center justify-center">
      <ThemeToggle />
      <Header />
    </SafeAreaView>
  );
}