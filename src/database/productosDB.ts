import { IProducto, IProductoDBEliminar } from "../models/IProducto";
import { db } from "./initDB";

export const productosDB = {
  insertarProductos: async (producto: IProducto) => {
    if (!db) throw new Error("DB no inicializada");

    const values = [
      producto.nombre,
      producto.proUuId ?? "",
      producto.descripcion ?? "",
      producto.precio,
      producto.imagenUrl ?? "",
      producto.imagenUrlLocal ?? "",
      producto.categoria ?? "",
      producto.stock ?? 0,
      producto.marca ?? "",
      producto.modelo ?? "",
      producto.tamano ?? "",
      producto.peso ?? 0,
      producto.alto ?? 0,
      producto.ancho ?? 0,
      producto.largo ?? 0,
      producto.activo ? 1 : 0,
      producto.descuento ?? 0,
      producto.favorito ? 1 : 0,
      producto.carrito ? 1 : 0,
      producto.color1 ?? "",
      producto.color2 ?? "",
      producto.color3 ?? "",
      producto.sincronizado ? 1 : 0,
    ];

    try {
      const result = await db.runAsync(
        `INSERT INTO productos (
          nombre, proUuId, descripcion, precio, imagenUrl, imagenUrlLocal, categoria, stock,
          marca, modelo, tamano, peso, alto, ancho, largo, activo,
          descuento, favorito, carrito, color1, color2, color3, sincronizado
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
        values
      );
      console.log("Producto insertado con ID:", result.lastInsertRowId);
      return result.lastInsertRowId;
    } catch (error) {
      console.error("Error al insertar producto:", error);
      throw error;
    }
  },

  actualizarProducto: async (producto: IProducto) => {
    if (!db) throw new Error("La base de datos no ha sido inicializada");
    if (!producto.id)
      throw new Error("El producto debe tener un ID para actualizar");
    if (!producto.proUuId) return;
    const values = [
      producto.nombre,
      producto.descripcion || "",
      producto.precio,
      producto.imagenUrl || "",
      producto.imagenUrlLocal || "",
      producto.categoria || "",
      producto.stock,
      producto.marca || "",
      producto.modelo || "",
      producto.tamano || "",
      producto.peso ?? 0,
      producto.alto ?? 0,
      producto.ancho ?? 0,
      producto.largo ?? 0,
      producto.activo ? 1 : 0,
      producto.descuento ?? 0,
      producto.favorito ? 1 : 0,
      producto.carrito ? 1 : 0,
      producto.color1 || "",
      producto.color2 || "",
      producto.color3 || "",
      0,
      producto.proUuId,
    ];

    await db.runAsync(
      `UPDATE productos SET
        nombre = ?, descripcion = ?, precio = ?, imagenUrl = ?, imagenUrlLocal = ?, categoria = ?, stock = ?,
        marca = ?, modelo = ?, tamano = ?, peso = ?, alto = ?, ancho = ?, largo = ?,
        activo = ?, descuento = ?, favorito = ?, carrito = ?, color1 = ?, color2 = ?, color3 = ?, sincronizado = ?
        WHERE proUuId = ?`,
      values
    );

    return producto.id;
  },

  obtenerProductos: async (): Promise<IProducto[]> => {
    if (!db) throw new Error("La base de datos no ha sido inicializada");

    const rows = await db.getAllAsync<IProducto>("SELECT * FROM productos");

    return rows;
  },

  eliminarProducto: async (data: IProductoDBEliminar) => {
    if (!db) throw new Error("La base de datos no ha sido inicializada");

    const result = await db.runAsync(`DELETE FROM productos WHERE id = ?`, [
      data.id,
    ]);
    const res: any = result;

    return res;

    // console.log(`Producto eliminado. Cambios: ${result.changes}`);
    // return result.changes > 0;
  },
  resetearTablaProductos: async () => {
    if (!db) throw new Error("DB no inicializada");

    // Eliminar datos
    await db.runAsync("DELETE FROM productos");

    // Reiniciar AUTOINCREMENT
    await db.runAsync("DELETE FROM sqlite_sequence WHERE name='productos'");
  },

  obtenerProductosPorUuIds: async (uuIds: string[]): Promise<string[]> => {
    if (!db) throw new Error("DB no inicializada");
    const sql = `SELECT proUuId FROM productos WHERE proUuId IN (${uuIds.map(() => "?").join(",")})`;
    const result = await db.getAllAsync<IProducto>(sql, uuIds);

    const res = result.map((p) => p.proUuId).filter((p) => p !== undefined);
    return res;
  },
};
