import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Loading, ThemeToggle } from "./components/home";
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setVisibility = async (visibility:'visible' | 'hidden') => {
      await NavigationBar.setVisibilityAsync(visibility)
    };
    setVisibility('hidden');
    const timer = setTimeout(() => {
      setLoading(false);
      setVisibility('visible');
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView className="flex-1 bg-gray-300 dark:bg-gray-900 items-center justify-center">
      <ThemeToggle />
      <Header />
    </SafeAreaView>
  );
}
