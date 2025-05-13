import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useProudctosDBList } from "@/src/database/services/productos-db/useProudctosDBList";
import * as Sharing from "expo-sharing";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import {
  _COMPRIMIR_DATA,
  _GUARDAR_DATA_JSON,
} from "@/src/services/exportar/archivosExport";
import { _COPIAR_IMAGENES_LOCALES } from "@/src/services/exportar/archivosExport";
import { IProducto } from "@/src/models/IProducto";
import ModalCompartirArchivo from "../ui/ModalCompartirArchivo";
const HeaderProductos = () => {
  const { data: dataProductos } = useProudctosDBList();
  const [visibleModal, setVisibleModal] = useState(false);
  const [pathZip, setPathZip] = useState<string>("");
  const exportarTodo = async () => {
    if (!dataProductos) return;
    const pathJson = await _GUARDAR_DATA_JSON(dataProductos);
    const pathAssets = await _COPIAR_IMAGENES_LOCALES(dataProductos);
    const zipFinal = await _COMPRIMIR_DATA(pathJson, pathAssets);
    console.log("pathAssets => ", pathAssets);
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
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>
        Productos pendientes de subir
      </Text>
      {dataProductos && dataProductos?.length > 0 && (
        <Button
          mode="contained"
          onPress={() => exportarTodo()}
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
          icon={({ size, color }) => (
            <Ionicons name="cloud-upload-outline" size={18} color="black" />
          )}
        >
          Subir
        </Button>
      )}
      <ModalCompartirArchivo
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
        onShare={() => compartirZip()}
        filePath={pathZip}
      />
    </View>
  );
};

export default HeaderProductos;
