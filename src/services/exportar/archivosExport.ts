import { IProducto } from "@/src/models/IProducto";
import * as FileSystem from "expo-file-system";
import { zip } from "react-native-zip-archive"; // ✅ Este es el correcto

export const _COMPRIMIR_DATA = async (
  rutaDataJson: string,
  carpetaAssets: string
) => {
  const carpetaBase = FileSystem.documentDirectory + "luxe_export/";
  await FileSystem.makeDirectoryAsync(carpetaBase, { intermediates: true });

  // Copiar data.json
  const nuevaRutaData = carpetaBase + "data.json";
  await FileSystem.copyAsync({ from: rutaDataJson, to: nuevaRutaData });

  // Copiar assets (con imagenes)
  const carpetaAssetsDestino = carpetaBase + "assets/";
  await FileSystem.makeDirectoryAsync(carpetaAssetsDestino, {
    intermediates: true,
  });
  await FileSystem.copyAsync({ from: carpetaAssets, to: carpetaAssetsDestino });

  // Crear ZIP
  const zipPath = FileSystem.documentDirectory + "luxe_backup.zip";
  const result = await zip(carpetaBase, zipPath); // ✅ result será 'file:///.../luxe_backup.zip'
  console.log("ZIP creado en:", result);
  return result;
};

export const _GUARDAR_DATA_JSON = async (productos: IProducto[]) => {
  const json = JSON.stringify(productos, null, 2);
  const path = FileSystem.documentDirectory + "data.json";
  await FileSystem.writeAsStringAsync(path, json);
  return path;
};

export const _COPIAR_IMAGENES_LOCALES = async (productos: IProducto[]) => {
  const carpetaAssets = FileSystem.documentDirectory + "assets/";
  const existe = await FileSystem.getInfoAsync(carpetaAssets);
  if (!existe.exists) await FileSystem.makeDirectoryAsync(carpetaAssets);

  for (const producto of productos) {
    if (producto.imagenUrlLocal?.startsWith("file://")) {
      const nombreArchivo = producto.proUuId + ".jpeg";
      const destino = carpetaAssets + nombreArchivo;
      await FileSystem.copyAsync({
        from: producto.imagenUrlLocal,
        to: destino,
      });
    }
  }
  return carpetaAssets;
};
