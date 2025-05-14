import { _COLORES_BASICOS } from "@/src/utils/constants";
import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

const COLORES_LIST = _COLORES_BASICOS.map((color) => ({
  label: color.label,
  value: color.value,
}));

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
}

export default function ModalSelectorConFiltro({
  visible,
  onClose,
  onSelect,
}: Props) {
  const [search, setSearch] = useState("");
  const filtered = COLORES_LIST.filter((color) =>
    color.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Selecciona un color</Text>

          <TextInput
            placeholder="Buscar color..."
            placeholderTextColor="black" // ← más visible o personalizado
            value={search}
            onChangeText={setSearch}
            mode="outlined"
            style={{ backgroundColor: "white", marginBottom: 12 }}
          />

          <FlatList
            data={filtered}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.value}
                style={styles.item}
                onPress={() => {
                  onSelect(item.label);
                  onClose();
                  setSearch("");
                }}
              >
                <View
                  key={item.value}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: item.value ?? "#FFFFF" },
                  ]}
                />
                <Text style={{ color: "black" }}>{item.label}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 12 }}
          />

          <Button mode="text" onPress={onClose}>
            Cancelar
          </Button>
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
    maxHeight: "80%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "black",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
