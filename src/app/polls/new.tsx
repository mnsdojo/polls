import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface PollOption {
  id: string;
  text: string;
}
interface Poll {
  question: string;
  options: PollOption[];
}
export default function NewPolls() {
  const [poll, setPoll] = useState<Poll>({
    question: "",
    options: [
      { id: Date.now().toString(), text: "" },
      { id: (Date.now() + 1).toString(), text: "" },
    ],
  });

  const addOption = () => {
    setPoll((prevPoll) => ({
      ...prevPoll,
      options: [...prevPoll.options, { id: Date.now().toString(), text: "" }],
    }));
  };

  const removeOption = (id: string) => {
    if (poll.options.length > 2) {
      setPoll((prev) => ({
        ...prev,
        options: prev.options.filter((option) => option.id !== id),
      }));
    }
  };
  const updateOption = (text: string, id: string) => {
    setPoll((prevPoll) => ({
      ...prevPoll,
      options: prevPoll.options.map((option) =>
        option.id === id ? { ...option, text } : option
      ),
    }));
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-lg font-semibold  mb-2 text-gray-700">
            Title
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg p-3 text-base"
            placeholder="Type your question here"
          />
        </View>
        <View className="mb-6">
          <Text className="mb-2 text-gray-700 font-semibold text-lg">
            Options
          </Text>
          {poll.options.map((option, index) => (
            <View key={option.id} className="flex-row items-center mb-3">
              <TextInput
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChangeText={(text: string) => updateOption(text, option.id)}
                className="flex-1 bg-white border-gray-300 border rounded-lg text-base p-3 mr-2"
              />
              {index >= 2 && (
                <TouchableOpacity onPress={() => removeOption(option.id)}>
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={24}
                    color="#EF4444"
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity
            onPress={addOption}
            className="flex-row items-center justify-center bg-blue-100  p-2 rounded-lg mt-2"
          >
            <MaterialCommunityIcons name="plus" size={24} color="#2563EB" />
            <Text className="ml-2 text-blue-600 font-semibold">Add Option</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className="p-4 bg-white border-t border-gray-200">
        <TouchableOpacity className="bg-blue-600 py-3 px-4 rounded-lg items-center">
          <Text className="text-white font-semibold text-lg">Create Poll</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
