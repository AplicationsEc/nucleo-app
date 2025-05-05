import React, { useCallback, useState } from "react";
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
interface Props {
  route: {
    params?: {
      producto?: IProducto;
    };
  };
  navigation: any;
}

const productoVacio: IProducto = {
  id: 0,
  nombre: "",
  descripcion: "",
  precio: 0,
  stock: 0,
  activo: true,
};

export default function ProductoEditarScreen({ route, navigation }: Props) {
  const editando = !!route.params?.producto;
  const [form, setForm] = useState<IProducto>(
    route.params?.producto ?? productoVacio
  );
  const [modalColor1Visible, setModalColor1Visible] = useState(false);
  const [modalColor2Visible, setModalColor2Visible] = useState(false);
  const [modalColor3Visible, setModalColor3Visible] = useState(false);

  const handleChange = (field: keyof IProducto, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      handleChange("imagenUrl", result.assets[0].uri);
    }
  };

  const handleGuardar = () => {
    if (form.nombre.trim() === "") {
      Alert.alert("Falta nombre");
      return;
    }

    if (editando) {
      // PUT a tu backend
      console.log("Actualizando producto:", form);
    } else {
      // POST a tu backend
      console.log("Creando producto:", form);
    }

    Alert.alert(editando ? "Producto actualizado" : "Producto creado");
    navigation.goBack();
  };

  const obtenerColor = useCallback((color?: string) => {
    if (!color) return null;
    return _COLORES_BASICOS.find((c) => c.value === color);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        {editando ? "Editar Producto" : "Nuevo Producto"}
      </Text>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {form.imagenUrl ? (
          <Image source={{ uri: form.imagenUrl }} style={styles.imagen} />
        ) : (
          <Ionicons name="camera-outline" size={50} color="#888" />
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={form.nombre}
        onChangeText={(text) => handleChange("nombre", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={form.descripcion}
        onChangeText={(text) => handleChange("descripcion", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={form.precio.toString()}
        onChangeText={(text) => handleChange("precio", parseFloat(text) || 0)}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        keyboardType="numeric"
        value={form.stock.toString()}
        onChangeText={(text) => handleChange("stock", parseInt(text) || 0)}
      />

      <TextInput
        style={styles.input}
        placeholder="Descuento (%)"
        keyboardType="numeric"
        value={form.descuento?.toString() ?? ""}
        onChangeText={(text) =>
          handleChange("descuento", parseFloat(text) || 0)
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={form.peso?.toString() ?? ""}
        onChangeText={(text) => handleChange("peso", parseFloat(text) || 0)}
      />
      <TextInput
        style={styles.input}
        placeholder="Alto (cm)"
        keyboardType="numeric"
        value={form.alto?.toString() ?? ""}
        onChangeText={(text) => handleChange("alto", parseFloat(text) || 0)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ancho (cm)"
        keyboardType="numeric"
        value={form.ancho?.toString() ?? ""}
        onChangeText={(text) => handleChange("ancho", parseFloat(text) || 0)}
      />
      <TextInput
        style={styles.input}
        placeholder="Largo (cm)"
        keyboardType="numeric"
        value={form.largo?.toString() ?? ""}
        onChangeText={(text) => handleChange("largo", parseFloat(text) || 0)}
      />
      <Text style={styles.label}>Colores</Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button
          mode="outlined"
          onPress={() => {
            setModalColor1Visible(true);
          }}
        >
          <Text style={{ color: obtenerColor(form.color1)?.value }}>
            {obtenerColor(form.color1)?.label || "Color 1"}
          </Text>
        </Button>
        <Button mode="outlined" onPress={() => setModalColor2Visible(true)}>
          <Text style={{ color: obtenerColor(form.color2)?.value }}>
            {obtenerColor(form.color2)?.label || "Color 2"}
          </Text>
        </Button>
        <Button mode="outlined" onPress={() => setModalColor3Visible(true)}>
          <Text style={{ color: obtenerColor(form.color3)?.value }}>
            {obtenerColor(form.color3)?.label || "Color 3"}
          </Text>
        </Button>
      </View>

      <View style={styles.switchRow}>
        <Text>Activo</Text>
        <Switch
          value={form.activo ?? true}
          onValueChange={(val) => handleChange("activo", val)}
        />
      </View>
      <View style={styles.switchRow}>
        <Text>Favorito</Text>
        <Switch
          value={form.favorito ?? false}
          onValueChange={(val) => handleChange("favorito", val)}
        />
      </View>
      <View style={styles.switchRow}>
        <Text>En carrito</Text>
        <Switch
          value={form.carrito ?? false}
          onValueChange={(val) => handleChange("carrito", val)}
        />
      </View>
      <View style={{ paddingBottom: 30 }}>
        <TouchableOpacity onPress={handleGuardar} style={_BOTONES.PRIMARY}>
          <Text style={styles.botonTexto}>
            {editando ? "Guardar Cambios" : "Crear Producto"}
          </Text>
        </TouchableOpacity>
      </View>
      <ModalSelectorConFiltro
        visible={modalColor1Visible}
        onClose={() => setModalColor1Visible(false)}
        onSelect={(val) => handleChange("color1", val)}
      />
      <ModalSelectorConFiltro
        visible={modalColor2Visible}
        onClose={() => setModalColor2Visible(false)}
        onSelect={(val) => handleChange("color2", val)}
      />
      <ModalSelectorConFiltro
        visible={modalColor3Visible}
        onClose={() => setModalColor3Visible(false)}
        onSelect={(val) => handleChange("color3", val)}
      />
    </ScrollView>
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
