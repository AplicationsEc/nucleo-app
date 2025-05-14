import * as FileSystem from "expo-file-system";
import { productosDB } from "@/src/database/productosDB";
import { IProducto } from "@/src/models/IProducto";
export const sincronizarProductos = async (
  productos: IProducto[]
): Promise<boolean> => {
  if (!productos) return false;
  const uuIds = productos
    .map((producto) => producto.proUuId)
    .filter((p) => p !== undefined);

  const uuidsExistentes = await productosDB.obtenerProductosPorUuIds(uuIds);

  const productosGuardados = productos.filter(
    (p) => !uuidsExistentes.includes(p.proUuId ?? "")
  );

  try {
    for (const producto of productosGuardados) {
      const syncPro: IProducto = { ...producto, sincronizado: true };

      await productosDB.insertarProductos(syncPro); // espera cada inserción
    }

    return true;
  } catch (error) {
    console.error("Error sincronizando productos", error);
    return false;
  }
};

export const _DESCARGAR_IMAGENES_Y_ACTUALIZAR_PATHS = async (
  productos: IProducto[]
): Promise<void> => {
  const carpetaDestino =
    "file:///data/user/0/com.applicationsec.primeapp/cache/ImagePicker/";

  // Asegurarse de que la carpeta exista
  const carpetaInfo = await FileSystem.getInfoAsync(carpetaDestino);
  if (!carpetaInfo.exists) {
    await FileSystem.makeDirectoryAsync(carpetaDestino, {
      intermediates: true,
    });
  }

  for (const producto of productos) {
    const urlImagen = producto.imagenUrl;

    if (urlImagen) {
      const nombreArchivo = urlImagen.split("/").pop(); // ej: "3.jpg"
      const rutaLocal = carpetaDestino + nombreArchivo;

      try {
        const { exists } = await FileSystem.getInfoAsync(rutaLocal);
        if (!exists) {
          await FileSystem.downloadAsync(urlImagen, rutaLocal);
          console.log(`✅ Imagen descargada: ${rutaLocal}`);
        }
      } catch (err) {
        console.warn(`⚠️ Error descargando imagen: ${urlImagen}`, err);
      }
    }
  }
};
