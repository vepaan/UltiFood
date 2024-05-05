import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import styles from '../AppStyles';

function Header() {
  return (
    <>
      <Text className="text-black dark:text-white text-4xl font-bold">
        Ultifood
      </Text>
      <Text className="text-black dark:text-white text-center text-lg">
        Subtitle
      </Text>
    </>
  );
}

function Loading(){
    return (
        <View className="flex-1 bg-[#ffaa59] items-center justify-center">
            <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>
    )
}

function ThemeToggle(){
const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <Pressable
    className="bg-gray-400 absolute top-16 right-8 dark:bg-blue-950 font-bold py-2 px-4 rounded-xl"
    onPress={() =>
      setColorScheme("dark" === colorScheme ? "light" : "dark")
    }
    accessibilityLabel="Learn more about this purple button"
  >
    <Text className="text-white">
      {"dark" === colorScheme ? "🌞" : "🌙"}
    </Text>
  </Pressable>
  );
}
export { Header, Loading, ThemeToggle };
