import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

import ProductoNuevoScreen from "../screens/productos/ProductoNuevoScreen";
import ProductoListadoScreen from "../screens/productos/ProductoListadoScreen";

const Tab = createBottomTabNavigator();

export default function ProductosTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          borderTopWidth: 0, // quita línea superior
          elevation: 0, // Android
          shadowOpacity: 0, // iOS
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={["rgba(255,255,255,0)", "#ffffff"]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Listado"
        component={ProductoListadoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Nuevo"
        component={ProductoNuevoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
