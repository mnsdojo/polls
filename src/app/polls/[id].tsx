import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { usePollById } from "@/src/hooks/usePollById";
import ErrorMessage from "@/src/components/ui/error-message";
import Loader from "@/src/components/ui/loader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/auth-provider";

export default function PollDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const { loading, poll, error } = usePollById(+id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  async function submitVote() {
    setIsSubmitting(true);

    if (!user || !poll) {
      Alert.alert("Something went wrong: user or poll is undefined");
      setIsSubmitting(false); // Ensure we reset the submitting state
      return;
    }

    try {
      const { data, error } = await supabase
        .from("votes")
        .insert([{ option: selectedText, poll_id: poll.id, user_id: user.id }])
        .select();

      if (error) {
        Alert.alert("Error submitting vote: " + error.message);
        return;
      }

      // Optionally, handle the successful vote submission, e.g., update UI or notify the user
    } catch (error) {
      console.error("Unexpected error:", error);
      Alert.alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }
  if (!poll) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-gray-800 mb-2 font-bold text-3xl">
            {poll.question}
          </Text>
          <Text className="text-gray-600 mb-6">Poll ID: {id}</Text>
          {poll.options.map((option, index) => (
            <Pressable
              key={option}
              onPress={() => {
                setSelected(index);
                setSelectedText(option);
              }}
              className={`bg-white p-4 shadow-sm mb-4 rounded-md border-gray-200 flex-row items-center justify-between 
                ${selected === index ? "border-blue-500" : "border-gray-200"}`}
            >
              <Text className="text-lg text-gray-800">{option}</Text>
              <MaterialCommunityIcons
                name={selected === index ? "check-circle" : "circle-outline"}
                size={24}
                color={selected === index ? "#3B82F6" : "#gray"}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View className="p-4 border-t border-gray-200 bg-white">
        <Text className="text-center text-gray-600 mb-2">
          Total Votes: {40} - {selected}
        </Text>
        <Pressable
          onPress={submitVote}
          className="bg-blue-600 rounded-lg py-4 items-center"
          disabled={selected === null || isSubmitting} // Disable button if no option is selected
        >
          <Text className="text-white font-semibold text-lg">
            {isSubmitting ? "Loading.." : "Vote"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
