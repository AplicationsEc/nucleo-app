import React from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelectGallery: () => void;
  onSelectCamera: () => void;
}

const ModalTomarFotoCargarFoto = ({
  visible,
  onClose,
  onSelectGallery,
  onSelectCamera,
}: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.option} onPress={onSelectGallery}>
            <Ionicons name="images-outline" size={24} color="#2a9d8f" />
            <Text style={styles.optionText}>Cargar desde galería</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={onSelectCamera}>
            <Ionicons name="camera-outline" size={24} color="#2a9d8f" />
            <Text style={styles.optionText}>Tomar foto</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: "#f8f9fa",
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
  },
});

export default ModalTomarFotoCargarFoto;
