import React from "react";
import { View, Text, Image, Pressable} from "react-native";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './AppStyles';

export default function App() {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <>
    <SafeAreaView className="flex-1 bg-gray-300 dark:bg-gray-900 items-center justify-center">
      <Image className=" text-white" source={require('./assets/logo.png')} style={styles.logo} />
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
      <Text className="text-black dark:text-white text-4xl font-bold">
        Ultifood
      </Text>
      <Text className="text-black dark:text-white text-center text-lg">Subtitle</Text>
    </SafeAreaView>
    </>
  );
}
