import React, { useCallback, useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { IProducto } from "@/src/models/IProducto";
import { Switch } from "react-native"; // ...
import { _BOTONES, _COLORES_BASICOS } from "@/src/utils/constants";
import ModalSelectorConFiltro from "@/src/components/ui/ModalSelectColors";
import { Button } from "react-native-paper";
import { useProductosDBCreate } from "@/src/database/services/productos-db/useProductosDBCreate";
import ModalTomarFotoCargarFoto from "@/src/components/ui/ModalTomarFotoCargarFoto";
import FormularioProductos from "@/src/components/formularios/FormularioProductos";
interface Props {
  route: {
    params?: {
      producto?: IProducto;
    };
  };
  navigation: any;
}

export default function ProductoEditarScreen({ route, navigation }: Props) {
  useEffect(() => {
    navigation.setOptions({
      title: "Nuevo Producto",
    });
  }, [navigation]);

  const handleSuccess = () => {
    navigation.goBack();
  };
  return (
    <FormularioProductos
      onSuccess={handleSuccess}
      editando={false}
      producto={route.params?.producto}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  imagePicker: {
    alignSelf: "center",
    marginBottom: 16,
    width: 160,
    height: 160,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imagen: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: "#2a9d8f",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
    paddingHorizontal: 4,
  },
  pickerInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});
