import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const polls = [
  { id: 1, question: "What is your favorite color?", votes: 120 },
  {
    id: 2,
    question: "What is your preferred programming language?",
    votes: 95,
  },
  { id: 3, question: "What is your favorite food?", votes: 80 },
  { id: 4, question: "What type of music do you enjoy?", votes: 150 },
  { id: 5, question: "What is your favorite season?", votes: 60 },
];

export default function Page() {
  return (
    <View className="flex-1 p-4 bg-gray-50">
      <Text className="text-3xl font-bold text-gray-800 mb-2">
        Welcome to Polls
      </Text>
      <Text className="text-gray-600 mb-4">
        Participate in our quick polls and share your opinions!
      </Text>
      <FlatList
        data={polls}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/polls/${item.id}`} asChild>
            <TouchableOpacity className="bg-white rounded-lg p-4 mb-3 flex-row items-center justify-between shadow-sm">
              <View className="flex-1 mr-2">
                <Text className="text-lg font-medium text-gray-800 mb-1">
                  {item.question}
                </Text>
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name="poll"
                    size={18}
                    color="#4A5568"
                  />
                  <Text className="text-sm text-gray-600 ml-1">
                    {item.votes} votes
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#4A5568"
              />
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
