import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

import ProductoNuevoScreen from "../screens/productos/ProductoNuevoScreen";
import ProductoListadoScreen from "../screens/productos/ProductoListadoWebScreen";
import ProductoListadoWebScreen from "../screens/productos/ProductoListadoWebScreen";
import ProductosAddRecientes from "../screens/productos/ProductosAddRecientes";

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
        name="Listado Web"
        component={ProductoListadoWebScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cloud-done-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Nuevo"
        component={ProductoNuevoScreen}
        options={{
          title: "Nuevo Producto",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Por Subir"
        component={ProductosAddRecientes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-circle-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
