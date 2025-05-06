import { IProducto, IProductoDBEliminar } from "../models/IProducto";
import db from "./db";

export const productosDB = {
  insertarProducto: async (producto: IProducto) => {
    if (!db) throw new Error("La base de datos no ha sido inicializada");

    const values = [
      producto.nombre,
      producto.descripcion || "",
      producto.precio,
      producto.imagenUrl || "",
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
    ];

    const result = await db.runAsync(
      `INSERT INTO productos (
        nombre, descripcion, precio, imagenUrl, categoria, stock,
        marca, modelo, tamano, peso, alto, ancho, largo,
        activo, descuento, favorito, carrito, color1, color2, color3
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values
    );

    console.log("Producto insertado, ID:", result.lastInsertRowId);
    return result.lastInsertRowId;
  },

  actualizarProducto: async (producto: IProducto) => {
    if (!db) throw new Error("La base de datos no ha sido inicializada");
    if (!producto.id)
      throw new Error("El producto debe tener un ID para actualizar");

    const values = [
      producto.nombre,
      producto.descripcion || "",
      producto.precio,
      producto.imagenUrl || "",
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
      producto.id,
    ];

    await db.runAsync(
      `UPDATE productos SET
        nombre = ?, descripcion = ?, precio = ?, imagenUrl = ?, categoria = ?, stock = ?,
        marca = ?, modelo = ?, tamano = ?, peso = ?, alto = ?, ancho = ?, largo = ?,
        activo = ?, descuento = ?, favorito = ?, carrito = ?, color1 = ?, color2 = ?, color3 = ?
        WHERE id = ?`,
      values
    );

    console.log("Producto actualizado con ID:", producto.id);
  },

  obtenerProductos: async (): Promise<IProducto[]> => {
    if (!db) throw new Error("La base de datos no ha sido inicializada");

    interface DBProducto
      extends Omit<IProducto, "activo" | "favorito" | "carrito"> {
      activo: number;
      favorito: number;
      carrito: number;
    }

    const rows = await db.getAllAsync<DBProducto>("SELECT * FROM productos");

    return rows.map((p) => ({
      ...p,
      activo: p.activo === 1,
      favorito: p.favorito === 1,
      carrito: p.carrito === 1,
    }));
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
};
