import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Poll {
  id: number;
  question: string;
  votes: number;
}
const PollItem = ({ poll }: { poll: Poll }) => (
  <Link href={`/polls/${poll.id}`} asChild>
    <TouchableOpacity className="bg-white rounded-lg p-4 mb-3 flex-row items-center justify-between shadow-sm">
      <View className="flex-1 mr-2">
        <Text className="text-lg font-medium text-gray-800 mb-1">
          {poll.question}
        </Text>
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="poll" size={18} color="#4A5568" />
          <Text className="text-sm text-gray-600 ml-1">{poll.votes} votes</Text>
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#4A5568" />
    </TouchableOpacity>
  </Link>
);

export default PollItem;
