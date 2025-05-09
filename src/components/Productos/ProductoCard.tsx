import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { IProducto } from "@/src/models/IProducto";
import { useProductosDBEliminar } from "@/src/database/services/productos-db/useProductosDBEliminar";
import ModalConfirmarAccion from "../ui/ModalConfirmarAccion";
import ModalEditarProducto from "./ModalEditarProducto";

interface Props {
  producto: IProducto;
  onPress?: () => void;
  viewEliminar: boolean;
  viewBtnEditar: boolean;
}

export default function ProductoCard({
  producto,
  onPress,
  viewEliminar = false,
  viewBtnEditar = false,
}: Props) {
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const { mutate: eliminarProducto, isPending } = useProductosDBEliminar();
  const [modalVisible, setModalVisible] = useState(false);
  const handleEliminarConfirmar = () => {
    setModalVisible(true);
  };
  const handleEliminar = () => {
    eliminarProducto({ id: producto.id });
    setModalVisible(false);
  };
  const handleEditar = () => {
    setModalEditarVisible(true);
  };
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {producto.imagenUrl ? (
          <Image source={{ uri: producto.imagenUrl }} style={styles.imagen} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="image-outline" size={40} color="#ccc" />
          </View>
        )}
        {viewBtnEditar && (
          <TouchableOpacity style={styles.btnEditar} onPress={handleEditar}>
            <Ionicons name="create-outline" size={20} color="#333" />
          </TouchableOpacity>
        )}
        {viewEliminar && (
          <TouchableOpacity
            style={styles.btnEliminar}
            onPress={handleEliminarConfirmar}
            disabled={isPending}
          >
            <Ionicons name="trash" size={20} color="#e63946" />
          </TouchableOpacity>
        )}
        <View style={styles.info}>
          <Text style={styles.nombre} numberOfLines={2}>
            {producto.nombre}
          </Text>
          <Text style={styles.precio}>
            $
            {typeof producto.precio === "number"
              ? producto.precio.toFixed(2)
              : "0.00"}
          </Text>

          {typeof producto.descuento === "number" && (
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
      {modalVisible && (
        <ModalConfirmarAccion
          visible={modalVisible}
          titulo="Eliminar producto"
          mensaje="¿Estás seguro de querer eliminar este producto?"
          onConfirmar={handleEliminar}
          onCancelar={() => setModalVisible(false)}
        />
      )}
      {modalEditarVisible && (
        <ModalEditarProducto
          visible={modalEditarVisible}
          onClose={() => setModalEditarVisible(false)}
          producto={producto}
        />
      )}
    </View>
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
  btnEliminar: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 20,
    elevation: 3,
    zIndex: 1,
  },
  btnEditar: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 20,
    elevation: 3,
    zIndex: 1,
  },
});
