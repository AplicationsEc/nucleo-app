import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import ProductosTabs from "./ProductosTabs";
import { colors } from "../theme/colors";

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Productos: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.background.primary,
        },
        drawerActiveTintColor: colors.text.primary,
        drawerInactiveTintColor: colors.text.secondary,
        drawerActiveBackgroundColor: colors.background.secondary,
      }}
    >
      <Drawer.Screen
        options={{
          title: "Inicio",
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background.primary,
          },
          headerTintColor: colors.text.primary,
        }}
        name="Home"
        component={HomeScreen}
      />

      <Drawer.Screen
        name="Productos"
        component={ProductosTabs}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Configuración",
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background.primary,
          },
          headerTintColor: colors.text.primary,
        }}
      />
    </Drawer.Navigator>
  );
}
