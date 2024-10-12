import React, { useState } from "react";
import {
  Alert,
  View,
  AppState,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { supabase } from "@/src/lib/supabase";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-6">
      <View className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign in or Create an account
        </Text>
        <View className="mb-4">
          <TextInput
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email address"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View className="mb-6">
          <TextInput
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          className={`w-full bg-blue-500 rounded-md p-3 ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
          onPress={() => signInWithEmail()}
        >
          <Text className="text-white text-center font-semibold">Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-full bg-green-500 rounded-md p-3 mt-4 ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
          onPress={() => signUpWithEmail()}
        >
          <Text className="text-white text-center font-semibold">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
