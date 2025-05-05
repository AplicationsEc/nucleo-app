import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { IProducto } from "@/src/models/IProducto";

interface Props {
  producto: IProducto;
  onPress?: () => void;
}

export default function ProductoCard({ producto, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {producto.imagenUrl ? (
        <Image source={{ uri: producto.imagenUrl }} style={styles.imagen} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="image-outline" size={40} color="#ccc" />
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.nombre} numberOfLines={2}>
          {producto.nombre}
        </Text>
        <Text style={styles.precio}>${producto.precio.toFixed(2)}</Text>
        {producto.descuento && (
          <Text style={styles.descuento}>-{producto.descuento}%</Text>
        )}
        {producto.favorito && (
          <Ionicons
            name="heart"
            size={16}
            color="#e63946"
            style={styles.iconFavorito}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imagen: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  placeholder: {
    height: 120,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    padding: 8,
  },
  nombre: {
    fontWeight: "600",
    fontSize: 14,
  },
  precio: {
    color: "#2a9d8f",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
  },
  descuento: {
    fontSize: 12,
    color: "#e76f51",
  },
  iconFavorito: {
    position: "absolute",
    top: 4,
    right: 4,
  },
});
