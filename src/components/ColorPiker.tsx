import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Menu, Button, Text } from "react-native-paper";
import { _COLORES } from "../utils/constants";
const COLORES_LIST = Object.entries(_COLORES).map(([label, value]) => ({
  label,
  value,
}));

interface Props {
  label: string;
  value?: string;
  onSelect: (value: string) => void;
}

export default function ColorPicker({ label, value, onSelect }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setVisible(true)}
            style={styles.button}
            contentStyle={{ justifyContent: "flex-start" }}
            icon={() => (
              <View
                style={[
                  styles.colorCircle,
                  { backgroundColor: value ?? "#ccc" },
                ]}
              />
            )}
          >
            {COLORES_LIST.find((c) => c.value === value)?.label ??
              "Seleccionar"}
          </Button>
        }
      >
        {COLORES_LIST.map((color) => (
          <Menu.Item
            key={color.value}
            onPress={() => {
              onSelect(color.value);
              setVisible(false);
            }}
            title={color.label}
            leadingIcon={() => (
              <View
                style={[styles.colorCircle, { backgroundColor: color.value }]}
              />
            )}
          />
        ))}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  button: {
    justifyContent: "flex-start",
  },
  colorCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
    borderColor: "#aaa",
    borderWidth: 1,
  },
});
