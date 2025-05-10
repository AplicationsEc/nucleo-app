import React, { useEffect, useState } from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import AppProviders from "./src/providers/AppProviders";
import { initDB } from "./src/database/initDB";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    (async () => {
      console.log("Iniciando la base de datos...");
      await initDB(); // Esperar a que la base de datos esté lista
      console.log("Base de datos lista");
      setDbReady(true); // Solo renderizar la app después de esto

      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Permiso de cámara requerido para tomar fotos.");
      }
    })();
  }, []);

  if (!dbReady) return <ActivityIndicator />; // Puedes poner un splash o loading aquí

  return (
    <AppProviders>
      <RootNavigator />
      <StatusBar backgroundColor="black" />
    </AppProviders>
  );
}
