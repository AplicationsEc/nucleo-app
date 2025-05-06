import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("productos.db");

export default db;
