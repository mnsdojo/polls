import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/src/providers/auth-provider";
import { Redirect, router } from "expo-router";
import { supabase } from "@/src/lib/supabase";

interface PollOption {
  id: string;
  text: string;
}

interface Poll {
  question: string;
  options: PollOption[];
}

export default function NewPolls() {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const createPoll = async () => {
    setError("");
    setIsLoading(true);

    if (!poll.question.trim()) {
      setError("Please provide the question");
      setIsLoading(false);
      return;
    }

    const emptyOptions = poll.options.filter((o) => o.text.trim() === "");
    if (emptyOptions.length > 0) {
      setError("Please provide text for all options");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("polls")
        .insert([
          {
            question: poll.question.trim(),
            options: poll.options.map((option) => option.text.trim()),
          },
        ])
        .select();

      if (error) throw error;

      Alert.alert("Success", "Poll created successfully!");
      router.back();
    } catch (error) {
      console.error("Failed to create the poll:", error);
      Alert.alert("Error", "Failed to create the poll. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2 text-gray-700">
            Question
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg p-3 text-base"
            placeholder="Type your question here"
            value={poll.question}
            onChangeText={(text) =>
              setPoll((prev) => ({ ...prev, question: text }))
            }
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
            className="flex-row items-center justify-center bg-blue-100 p-2 rounded-lg mt-2"
          >
            <MaterialCommunityIcons name="plus" size={24} color="#2563EB" />
            <Text className="ml-2 text-blue-600 font-semibold">Add Option</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {error && (
        <Text className="text-red-500 px-4 py-2 text-center">{error}</Text>
      )}
      <View className="p-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          onPress={createPoll}
          disabled={isLoading}
          className={`py-3 px-4 rounded-lg items-center ${
            isLoading ? "bg-blue-400" : "bg-blue-600"
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-lg">
              Create Poll
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
