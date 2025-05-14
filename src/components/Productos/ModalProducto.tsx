import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { IProducto } from "@/src/models/IProducto";
import ModalImagenCompleta from "../Modals/ModalImagenCompleta";

interface Props {
  visible: boolean;
  producto: IProducto | null;
  onClose: () => void;
}

const { width } = Dimensions.get("window");

export default function ModalProducto({ visible, producto, onClose }: Props) {
  const [modalImagenCompletaVisible, setModalImagenCompletaVisible] =
    useState(false);
  if (!producto) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={onClose} style={styles.btnCerrar}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          {producto.imagenUrlLocal && (
            <View>
              <TouchableOpacity
                onPress={() => setModalImagenCompletaVisible(true)}
              >
                <Image
                  source={{ uri: producto.imagenUrlLocal }}
                  style={styles.imagen}
                />
              </TouchableOpacity>

              {/* Botón Editar */}
              <TouchableOpacity
                onPress={() => console.log("Editar producto")}
                style={styles.btnEditar}
              >
                <Ionicons name="create-outline" size={20} color="#333" />
              </TouchableOpacity>
            </View>
          )}

          <ScrollView contentContainerStyle={styles.scroll}>
            <Text style={styles.nombre}>{producto.nombre}</Text>
            <Text style={styles.descripcion}>{producto.descripcion}</Text>
            <Text style={styles.precio}>${producto.precio.toFixed(2)}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Categoría:</Text>
              <Text>{producto.categoria || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Marca:</Text>
              <Text>{producto.marca || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Modelo:</Text>
              <Text>{producto.modelo || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Stock:</Text>
              <Text>{producto.stock}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tamaño:</Text>
              <Text>{producto.tamano || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Peso:</Text>
              <Text>{producto.peso ? `${producto.peso} kg` : "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Dimensiones:</Text>
              <Text>
                {producto.alto ?? "?"} x {producto.ancho ?? "?"} x{" "}
                {producto.largo ?? "?"} cm
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Colores:</Text>
              <View style={styles.colorRow}>
                {[producto.color1, producto.color2, producto.color3]
                  .filter(Boolean)
                  .map((color, idx) => (
                    <View
                      key={idx}
                      style={[styles.colorCircle, { backgroundColor: color }]}
                    />
                  ))}
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Activo:</Text>
              <Ionicons
                name={producto.activo ? "checkmark-circle" : "close-circle"}
                size={20}
                color={producto.activo ? "green" : "gray"}
              />
            </View>
          </ScrollView>
        </View>
      </View>
      {modalImagenCompletaVisible && producto.imagenUrl && (
        <ModalImagenCompleta
          visible={modalImagenCompletaVisible}
          onClose={() => setModalImagenCompletaVisible(false)}
          imageUri={producto.imagenUrl}
        />
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
  btnEditar: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    elevation: 3,
    zIndex: 10,
  },

  btnCerrar: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
    elevation: 3,
  },
  imagen: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  descripcion: {
    fontSize: 14,
    color: "#555",
    marginVertical: 8,
  },
  precio: {
    fontSize: 18,
    color: "#2a9d8f",
    fontWeight: "bold",
  },
  row: {
    marginTop: 10,
  },
  label: {
    fontWeight: "600",
  },
  colorRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  colorCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
