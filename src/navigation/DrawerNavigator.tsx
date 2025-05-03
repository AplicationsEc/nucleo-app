import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "black", // 🎨 Fondo del drawer
        },
        drawerActiveTintColor: "#fff", // ✅ Color del texto activo
        drawerInactiveTintColor: "#ccc", // ✅ Color del texto inactivo
        drawerActiveBackgroundColor: "#1f1f1f", // ✅ Fondo del ítem activo
      }}
    >
      <Drawer.Screen
        options={{
          title: "Inicio",
          headerShown: true,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
        name="Home"
        component={HomeScreen}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Inicio",
          headerShown: true,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      />
    </Drawer.Navigator>
  );
}
