import React from "react";
import { View, Text, Pressable} from "react-native";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <View className="flex-1 bg-slate-900 items-center justify-center">
      <Text className="text-white text-center text-4xl font-bold">
        Ultifood
      </Text>
      <Text className="dark:text-white dark:text-center text-lg">subtitle</Text>
    </SafeAreaView>
  );
}
