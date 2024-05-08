import React, { useState, useEffect, useRef } from "react";
import { View, Image, Animated, Easing } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, ThemeToggle } from "@/components/Home";
import styles from '@/styles/AppStyles';
import * as NavigationBar from 'expo-navigation-bar';
import { Scanner } from "@/components/Scanner";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [loading, setLoading] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // NavigationBar.setBackgroundColorAsync("#111827");
    // NavigationBar.setVisibilityAsync("hidden");
    startSpinAnimation();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);
    // NavigationBar.setBehaviorAsync("inset-swipe")
    return () => clearTimeout(timer);
  }, []);

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
    outputRange: ["0deg", "360deg"],
  });

  return loading ? (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffaa59",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.Image
        source={require("@/assets/logo.png")}
        style={[
          styles.logo,
          {
            transform: [
              { translateX: -10 },
              { translateY: -0 },
              { rotate: spin },
              { translateX: 10 },
              { translateY: 0 },
            ],
          },
        ]}
      />
      <Image
        source={require("@/assets/logotext.png")}
        style={styles.logotext}
      ></Image>
      <StatusBar backgroundColor="#ffaa59" />
    </View>
  ) : (
    <SafeAreaView className="flex-1 bg-gray-300 dark:bg-gray-900 items-center justify-center">
      <ThemeToggle />
      <Scanner />
      <Header />
      <StatusBar backgroundColor="#111827" />
    </SafeAreaView>
  );
}
