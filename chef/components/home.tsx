import React, { useEffect, useRef, useState, Component } from "react";
import { View, Text, Pressable, Image, Animated, Easing, ScrollView, FlatList } from "react-native";
import { useColorScheme } from "nativewind";
import styles from "../AppStyles";
import { SafeAreaView } from "react-native-safe-area-context";

function Header() {
  return (
    <>
      <Text className="text-black dark:text-white">
        Good Morning, User
      </Text>
    </>
  );
}

function Loading() {
  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    startSpinAnimation();
  }, []);
  const startSpinAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(500),
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffaa59",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.Image
        source={require("../assets/logo.png")}
        style={[
          styles.logo,
          {
            transform: [
              { translateX: -0 },
              { translateY: -0 },
              { rotate: spin },
              { translateX: 10 },
              { translateY: 0 },
            ],
          },
        ]}
      />
    </View>
  );
}

function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <Pressable
      className="bg-gray-400 absolute top-16 right-8 dark:bg-blue-950 font-bold py-2 px-4 rounded-xl"
      onPress={() => setColorScheme("dark" === colorScheme ? "light" : "dark")}
      accessibilityLabel="Learn more about this purple button"
    >
      <Text className="text-white">{"dark" === colorScheme ? "🌞" : "🌙"}</Text>
    </Pressable>
  );
}


function Recommended(){
  return(
    <SafeAreaView style={{height: 130, top:500}}>
    <ScrollView horizontal>
        <View style={styles.filter}><Image style={styles.recommended} source={require('./recommended/momo.jpg')}/></View>
        <View style={styles.filter}><Image style={styles.recommended} source={require('./recommended/naan.jpg')}/></View>
    </ScrollView>
    </SafeAreaView>
  )
}


export { Header, Loading, ThemeToggle, Recommended};
