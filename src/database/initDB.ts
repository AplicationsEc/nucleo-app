import * as SQLite from "expo-sqlite/next";
import { IProducto } from "../models/IProducto";

let db: SQLite.SQLiteDatabase | null = null;

export const initDB = async () => {
  db = await SQLite.openDatabaseAsync("productos.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      descripcion TEXT,
      precio REAL,
      imagenUrl TEXT,
      categoria TEXT,
      stock INTEGER,
      marca TEXT,
      modelo TEXT,
      tamano TEXT,
      peso REAL,
      alto REAL,
      ancho REAL,
      largo REAL,
      activo INTEGER,
      descuento REAL,
      favorito INTEGER,
      carrito INTEGER,
      color1 TEXT,
      color2 TEXT,
      color3 TEXT
    );
  `);
};

export const insertarProducto = async (producto: IProducto) => {
  if (!db) throw new Error("DB no inicializada");

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
};
