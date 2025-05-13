import { Modal, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { colors } from "@/src/theme/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
  onShare: () => void;
  filePath?: string;
}

export default function ModalCompartirArchivo({
  visible,
  onClose,
  onShare,
  filePath,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Compartir Archivo</Text>

          <Text style={styles.message}>
            ¿Deseas compartir el archivo generado?
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={onClose}
              labelStyle={{ color: "black" }}
              style={{ backgroundColor: "transparent" }}
            >
              Cancelar
            </Button>

            <Button
              mode="contained"
              onPress={onShare}
              style={[styles.button, styles.shareButton]}
              labelStyle={styles.buttonLabel}
            >
              Compartir
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "black",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "black",
  },
  shareButton: {
    backgroundColor: "black",
  },
  buttonLabel: {
    fontSize: 14,
    color: "white",
  },
});
