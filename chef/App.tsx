import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, Pressable, Animated, Easing } from "react-native";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Loading, ThemeToggle } from "./components/home";
import styles from './AppStyles';

export default function App() {
  const [loading, setLoading] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);}, 6000);
      return () => clearTimeout(timer);}, []);

  useEffect(() => {
    if (loading) {
      startSpinAnimation();
    }
  }, []);

  const startSpinAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {toValue: 1, duration: 1500, easing: Easing.linear, useNativeDriver: true,}),
        Animated.delay(500),
        Animated.timing(spinValue, {toValue: 0, duration: 0, useNativeDriver: true,})
      ])
    ).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return loading ? (
    <View style={{ flex: 1, backgroundColor: "#ffaa59", alignItems: "center", justifyContent: "center" }}>
      <Animated.Image
        source={require("./assets/logo.png")}
        style={[styles.logo, { transform: [{ translateX: -0}, {translateY: -0}, {rotate: spin}, {translateX: 10}, {translateY: 0}] }]}
      />
    </View>
  ) : (
    <SafeAreaView className="flex-1 bg-gray-300 dark:bg-gray-900 items-center justify-center">
      <ThemeToggle />
      <Header />
    </SafeAreaView>
  );
}
