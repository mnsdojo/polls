import React from "react";
import { Redirect, Slot, Stack } from "expo-router";
import { useAuth } from "@/src/providers/auth-provider";

const primaryColor = "#2563EB"; // Tailwind's blue-600

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/profile" />;
  }

  return <Slot />;
}
