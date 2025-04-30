import { router, Tabs } from "expo-router";
import React, { useState } from "react";
import { Button, Platform, TouchableOpacity } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { IconButton } from "react-native-paper";
import { Menu } from "react-native-paper";
import { authApi } from "@/api/authApi";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const cerrarSesion = async () => {
    await authApi.logout();
    //setMenuVisible(false);
    router.replace("/(auth)");
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
        headerRight: () => (
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                icon="cog-outline"
                size={24}
                onPress={() => setMenuVisible(true)}
              />
            }
          >
            <Menu.Item onPress={() => cerrarSesion()} title="Cerrar sesión" />
          </Menu>
        ),

        // headerRight: () => (
        //   <TouchableOpacity
        //     style={{ marginRight: 15 }}
        //     onPress={() => console.log("Settings pressed")}
        //   >
        //     <Ionicons name="settings-outline" size={24} color="white" />
        //   </TouchableOpacity>
        // ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
