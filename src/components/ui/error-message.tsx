import { View, Text } from "react-native";
import React from "react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-500">{message}</Text>
    </View>
  );
}
