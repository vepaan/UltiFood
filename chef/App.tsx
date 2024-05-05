import React from "react";
import { View, Text, Pressable} from "react-native";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <View className="flex-1 bg-slate-900 items-center justify-center">
    <Text className="text-white text-center text-4xl font-bold"></Text>
    <SafeAreaView className="flex-1 bg-gray-300 dark:bg-gray-900 items-center justify-center">
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
      <Text className="text-white text-center text-lg">Subtitle</Text>
      </SafeAreaView>
      <Text className="dark:text-white dark:text-center text-lg">subtitle</Text>
    </View>
  );
}