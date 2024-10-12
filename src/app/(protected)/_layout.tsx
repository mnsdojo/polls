import React from "react";
import { Redirect, Slot } from "expo-router";
import { useAuth } from "@/src/providers/auth-provider";

export default function PrrotectedLayout() {
  const { user } = useAuth();
  if (!user) {
    return <Redirect href="/login" />;
  }
  return <Slot />;
}
