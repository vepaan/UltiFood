import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Loading, ThemeToggle } from "./components/home";
import styles from './AppStyles';
import * as NavigationBar from 'expo-navigation-bar';


const textArray = ['Burning Calories', 'Synthesizing Proteins', 'Building Muscle']

export default function App() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [loading, setLoading] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current;
  const [displayText, setDisplayText] = useState('');
  const [dots, setDots] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#111827");
    NavigationBar.setVisibilityAsync("hidden")
    const timer = setTimeout(() => {
      setLoading(false);
      NavigationBar.setBehaviorAsync("inset-swipe")
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loading>
    <View style={{ flex: 1, backgroundColor: "#ffaa59", alignItems: "center", justifyContent: "center" }}>
      <Animated.Image
        source={require("./assets/logo.png")}
        style={[styles.logo, { transform: [{ translateX: -10 }, { translateY: -0 }, { rotate: spin }, { translateX: 10 }, { translateY: 0 }] }]}
      />
      <Image source={require("./assets/logotext.png")} style={styles.logotext}></Image>
      <Text style={{ color: '#000', fontSize: 30, fontFamily:'sans', marginTop: 20 }}>{displayText}{dots}</Text>
    </View>
    <Loading />
  ) : (
    <SafeAreaView className="flex-1 bg-gray-300 dark:bg-gray-900 items-center justify-center">
      <ThemeToggle />
      <Header />
    </SafeAreaView>
  );
}