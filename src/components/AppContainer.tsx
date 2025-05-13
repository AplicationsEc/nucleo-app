import React from "react";
import { Platform, StatusBar, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AppContainerProps = {
  children: React.ReactNode;
  withPaddingTop?: boolean; // si necesitas espacio para el header
  style?: ViewStyle;
};

export const AppContainer: React.FC<AppContainerProps> = ({
  children,
  withPaddingTop = false,
  style,
}) => {
  const paddingTop =
    Platform.OS === "android"
      ? (StatusBar.currentHeight ?? 0)
      : withPaddingTop
        ? 5
        : 0;

  return (
    <SafeAreaView style={[styles.container, { paddingTop }, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // puedes hacerlo dinámico con tema
  },
});
