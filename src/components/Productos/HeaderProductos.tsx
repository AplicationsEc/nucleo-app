import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useProudctosDBList } from "@/src/database/services/productos-db/useProudctosDBList";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import {
  _COMPRIMIR_DATA,
  _GUARDAR_DATA_JSON,
  _COPIAR_IMAGENES_LOCALES,
} from "@/src/services/exportar/archivosExport";
import ModalCompartirArchivo from "../ui/ModalCompartirArchivo";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

interface HeaderProductosProps {
  verBtnSubir?: boolean;
  titulo?: string;
}

const HeaderProductos = ({
  verBtnSubir = true,
  titulo = "Productos pendientes de subir",
}: HeaderProductosProps) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { data: dataProductos } = useProudctosDBList();
  const [visibleModal, setVisibleModal] = useState(false);
  const [pathZip, setPathZip] = useState<string>("");

  const exportarTodo = async () => {
    if (!dataProductos) return;

    const dataTransformada = dataProductos.map((producto: any) => ({
      ...producto,
      activo: producto.activo === 1,
      favorito: producto.favorito === 1,
      carrito: producto.carrito === 1,
      sincronizado: producto.sincronizado === 1,
    }));

    const pathJson = await _GUARDAR_DATA_JSON(dataTransformada);
    const pathAssets = await _COPIAR_IMAGENES_LOCALES(dataTransformada);
    const zipFinal = await _COMPRIMIR_DATA(pathJson, pathAssets);

    setPathZip(`file://${zipFinal}`);
    setVisibleModal(true);
  };

  const compartirZip = async () => {
    const puedeCompartir = await Sharing.isAvailableAsync();
    if (!puedeCompartir) {
      console.log("No se puede compartir en este dispositivo");
      return;
    }
    await Sharing.shareAsync(pathZip);
  };

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "black",
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Botón de menú y título */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="menu-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
          onPress={() => navigation.toggleDrawer()}
        />
        <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>
          {titulo}
        </Text>
      </View>

      {/* Botón Subir */}
      {dataProductos && dataProductos.length > 0 && verBtnSubir && (
        <Button
          mode="contained"
          onPress={exportarTodo}
          contentStyle={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
          style={{
            backgroundColor: "white",
            borderRadius: 8,
          }}
          labelStyle={{ color: "black", fontSize: 9 }}
          icon={() => (
            <Ionicons name="cloud-upload-outline" size={18} color="black" />
          )}
        >
          Subir
        </Button>
      )}

      <ModalCompartirArchivo
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
        onShare={compartirZip}
        filePath={pathZip}
      />
    </View>
  );
};

export default HeaderProductos;
