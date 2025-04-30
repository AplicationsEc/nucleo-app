import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Platform,
  Text,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { configApp } from "@/helper/constants";

export interface IProducto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
  categoria?: string;
  stock: number;
  marca?: string;
  modelo?: string;
  tamaño?: string;
  peso?: number;
  alto?: number;
  ancho?: number;
  largo?: number;
  activo?: boolean;
  descuento?: number;
  favorito?: boolean;
  carrito?: boolean;
  color1?: string;
  color2?: string;
  color3?: string;
}

export default function HomeScreen() {
  const [producto, setProducto] = useState<IProducto>({
    id: 0,
    nombre: "",
    precio: 0,
    stock: 0,
    activo: true,
  });

  const handleChange = (field: keyof IProducto, value: any) => {
    setProducto((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedText style={styles.title}>
          Bienvenido al administrador de{" "}
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {configApp.nombreEmpresa}
          </Text>
        </ThemedText>
        <ThemedText style={styles.title}>Nuevo Producto</ThemedText>

        <View style={styles.formGroup}>
          <ThemedText>Nombre *</ThemedText>
          <TextInput
            style={styles.input}
            value={producto.nombre}
            onChangeText={(text) => handleChange("nombre", text)}
            placeholder="Nombre del producto"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText>Descripción</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={producto.descripcion}
            onChangeText={(text) => handleChange("descripcion", text)}
            placeholder="Descripción del producto"
            multiline
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText>Precio *</ThemedText>
          <TextInput
            style={styles.input}
            value={producto.precio.toString()}
            onChangeText={(text) =>
              handleChange("precio", parseFloat(text) || 0)
            }
            placeholder="Precio"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText>URL de la imagen</ThemedText>
          <TextInput
            style={styles.input}
            value={producto.imagenUrl}
            onChangeText={(text) => handleChange("imagenUrl", text)}
            placeholder="URL de la imagen"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText>Categoría</ThemedText>
          <TextInput
            style={styles.input}
            value={producto.categoria}
            onChangeText={(text) => handleChange("categoria", text)}
            placeholder="Categoría"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText>Stock *</ThemedText>
          <TextInput
            style={styles.input}
            value={producto.stock.toString()}
            onChangeText={(text) => handleChange("stock", parseInt(text) || 0)}
            placeholder="Stock"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText>Marca</ThemedText>
          <TextInput
            style={styles.input}
            value={producto.marca}
            onChangeText={(text) => handleChange("marca", text)}
            placeholder="Marca"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText>Modelo</ThemedText>
          <TextInput
            style={styles.input}
            value={producto.modelo}
            onChangeText={(text) => handleChange("modelo", text)}
            placeholder="Modelo"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText>Tamaño</ThemedText>
          <TextInput
            style={styles.input}
            value={producto.tamaño}
            onChangeText={(text) => handleChange("tamaño", text)}
            placeholder="Tamaño"
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText>Peso (kg)</ThemedText>
          <TextInput
            style={styles.input}
            value={producto.peso?.toString()}
            onChangeText={(text) => handleChange("peso", parseFloat(text) || 0)}
            placeholder="Peso"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.dimensionsContainer}>
          <View style={styles.dimensionInput}>
            <ThemedText>Alto (cm)</ThemedText>
            <TextInput
              style={styles.input}
              value={producto.alto?.toString()}
              onChangeText={(text) =>
                handleChange("alto", parseFloat(text) || 0)
              }
              placeholder="Alto"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.dimensionInput}>
            <ThemedText>Ancho (cm)</ThemedText>
            <TextInput
              style={styles.input}
              value={producto.ancho?.toString()}
              onChangeText={(text) =>
                handleChange("ancho", parseFloat(text) || 0)
              }
              placeholder="Ancho"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.dimensionInput}>
            <ThemedText>Largo (cm)</ThemedText>
            <TextInput
              style={styles.input}
              value={producto.largo?.toString()}
              onChangeText={(text) =>
                handleChange("largo", parseFloat(text) || 0)
              }
              placeholder="Largo"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <ThemedText>Descuento (%)</ThemedText>
          <TextInput
            style={styles.input}
            value={producto.descuento?.toString()}
            onChangeText={(text) =>
              handleChange("descuento", parseFloat(text) || 0)
            }
            placeholder="Descuento"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.colorsContainer}>
          <View style={styles.colorInput}>
            <ThemedText>Color 1</ThemedText>
            <TextInput
              style={styles.input}
              value={producto.color1}
              onChangeText={(text) => handleChange("color1", text)}
              placeholder="Color 1"
            />
          </View>

          <View style={styles.colorInput}>
            <ThemedText>Color 2</ThemedText>
            <TextInput
              style={styles.input}
              value={producto.color2}
              onChangeText={(text) => handleChange("color2", text)}
              placeholder="Color 2"
            />
          </View>

          <View style={styles.colorInput}>
            <ThemedText>Color 3</ThemedText>
            <TextInput
              style={styles.input}
              value={producto.color3}
              onChangeText={(text) => handleChange("color3", text)}
              placeholder="Color 3"
            />
          </View>
        </View>

        <View style={styles.switchContainer}>
          <ThemedText>Activo</ThemedText>
          <Switch
            value={producto.activo}
            onValueChange={(value) => handleChange("activo", value)}
          />
        </View>

        {/* <View style={styles.switchContainer}>
          <ThemedText>Favorito</ThemedText>
          <Switch
            value={producto.favorito}
            onValueChange={(value) => handleChange("favorito", value)}
          />
        </View>

        <View style={styles.switchContainer}>
          <ThemedText>En carrito</ThemedText>
          <Switch
            value={producto.carrito}
            onValueChange={(value) => handleChange("carrito", value)}
          />
        </View> */}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dimensionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dimensionInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  colorsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  colorInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
});
