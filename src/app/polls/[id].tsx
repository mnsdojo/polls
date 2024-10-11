import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const poll = {
  question: "React Native Vs Flutter?",
  options: ["React Native FTW", "Flutter", "SwiftUI"],
  totalVotes: 150,
};
export default function PollDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView className="flex-1  bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-gray-800 mb-2 font-bold text-3xl">
            {poll.question}
          </Text>
          <Text className="text-gray-600 mb-6">Poll ID: {id}</Text>
          {poll.options.map((option, index) => (
            <TouchableOpacity
              key={option}
              className="bg-white p-4 shadow-sm mb-4 rounded-md border-gray-200 active:bg-gray-100"
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-lg text-gray-800">{option}</Text>
                <View className="bg-blue-100 px-3 py-1 rounded-full">
                  <Text className="text-blue-800 font-medium">
                    {Math.floor(Math.random() * 100)}%
                  </Text>
                </View>
              </View>
              <View className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
                <View
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View className="p-4 border-t border-gray-200  bg-white">
        <Text className="text-center text-gray-600 mb-2">
          Total Votes: {poll.totalVotes}
        </Text>
        <TouchableOpacity className="bg-blue-600 rounded-lg py-4 items-center">
          <Text className="text-white font-semibold text-lg">Submit Vote</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
