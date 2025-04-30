import { DefaultTheme, DarkTheme } from "@react-navigation/native";

import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <Slot />
          <StatusBar style="auto" />
        </PaperProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
