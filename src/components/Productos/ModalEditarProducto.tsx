import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import FormularioProductos from "../formularios/FormularioProductos";
import { IProducto } from "@/src/models/IProducto";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  onClose: () => void;
  producto: IProducto;
}

export default function ModalEditarProducto({
  visible,
  onClose,
  producto,
}: Props) {
  const handleSuccess = () => {
    onClose();
  };
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.titulo}>Editar Producto</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <FormularioProductos
            producto={producto}
            onSuccess={handleSuccess}
            editando={true}
          />
        </View>
      </View>
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
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnCerrar: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
