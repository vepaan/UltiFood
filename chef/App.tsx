import React from "react";
import { View, Text} from "react-native";

export default function App() {
  return (
    <View className="flex-1 bg-slate-900 items-center justify-center">
      <Text className="text-white text-center text-4xl font-bold">
        UltiFood
      </Text>
      <Text className="text-white text-center text-lg">Subtitle</Text>
    </View>
  );
}
