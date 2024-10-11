import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";

import { useEffect } from "react";
import "react-native-reanimated";
const primaryColor = "#2563EB"; // Tailwind's blue-600

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: { backgroundColor: primaryColor },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "Polls",
          headerRight: () => (
            <Link href="/polls/new" className="mr-4">
              <AntDesign name="plus" size={24} color="#fff" />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="polls/[id]"
        options={{
          headerStyle: { backgroundColor: primaryColor },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "Poll Details",
        }}
      />
      <Stack.Screen
        name="polls/new"
        options={{
          headerStyle: { backgroundColor: primaryColor },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "Create Poll",
        }}
      />
    </Stack>
  );
}
