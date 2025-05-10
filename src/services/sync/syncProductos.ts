import { productosDB } from "@/src/database/productosDB";
import { IProducto } from "@/src/models/IProducto";
export const sincronizarProductos = async (
  productos: IProducto[]
): Promise<boolean> => {
  if (!productos) return false;

  const uuIds = productos
    .map((producto) => producto.proUuId)
    .filter((p) => p !== undefined);

  // await productosDB.resetearTablaProductos();

  // return true;
  // Verificar si los UUIDs ya existen en la base de datos
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
