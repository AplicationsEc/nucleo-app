import * as SQLite from "expo-sqlite/next";

export let db: SQLite.SQLiteDatabase;

export const initDB = async () => {
  db = await SQLite.openDatabaseAsync("primeappc.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      proUuId TEXT,
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
      color3 TEXT,
      sincronizado INTEGER
    );
  `);
  const columnas = await db.getAllAsync<{ name: string }>(
    "PRAGMA table_info(productos);"
  );
  console.log(
    "Columnas en productos:",
    columnas.map((c) => c.name)
  );
};
