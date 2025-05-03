import React from "react";
import AppProviders from "./src/providers/AppProviders";
import RootNavigator from "./src/navigation/RootNavigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <AppProviders>
      <RootNavigator />
      <StatusBar backgroundColor="black" />
    </AppProviders>
  );
}
