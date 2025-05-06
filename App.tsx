import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import AppProviders from "./src/providers/AppProviders";
import { initDB } from "./src/database/initDB";

export default function App() {
  useEffect(() => {
    initDB();
  }, []);
  return (
    <AppProviders>
      <RootNavigator />
      <StatusBar backgroundColor="black" />
    </AppProviders>
  );
}
