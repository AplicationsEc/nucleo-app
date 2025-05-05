import { StatusBar } from "expo-status-bar";
import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import AppProviders from "./src/providers/AppProviders";

export default function App() {
  return (
    <AppProviders>
      <RootNavigator />
      <StatusBar backgroundColor="black" />
    </AppProviders>
  );
}
