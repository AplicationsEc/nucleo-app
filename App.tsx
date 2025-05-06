import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import AppProviders from "./src/providers/AppProviders";
import { initDB } from "./src/database/initDB";
import * as ImagePicker from "expo-image-picker";
export default function App() {
  useEffect(() => {
    initDB();
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Permiso de cámara requerido para tomar fotos.");
      }
    })();
  }, []);
  return (
    <AppProviders>
      <RootNavigator />
      <StatusBar backgroundColor="black" />
    </AppProviders>
  );
}
