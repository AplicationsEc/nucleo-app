import { productosDB } from "@/src/database/productosDB";
import { IProducto } from "@/src/models/IProducto";
export const sincronizarProductos = async (
  productos: IProducto[]
): Promise<boolean> => {
  if (!productos) return false;

  const uuIds = productos
    .map((producto) => producto.proUuId)
    .filter((p) => p !== undefined);
  console.log("uuIds => ", uuIds);
  // Verificar si los UUIDs ya existen en la base de datos
  const productosExistentes = await productosDB.obtenerProductosPorUuIds(uuIds);

  const productosGuardados = productos.filter((p) =>
    productosExistentes.includes(p.proUuId ?? "")
  );

  console.log("productosGuardados => ", productosGuardados);

  return true;

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
