import { API_URL } from "../helper/constants";
import { IProducto } from "../models/IProducto";

export const productosAPI = {
  getProductos: async (): Promise<IProducto[]> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener los productos");

      const data = await response.json();
      return data.data ?? []; // Ajustá esto si tu JSON no usa clave "data"
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return [];
    }
  },
  getProductoById: async (id: number): Promise<IProducto | null> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener el producto");

      const data = await response.json();
      const productos: IProducto[] = data.data ?? [];

      return productos.find((item) => item.id === id) || null;
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      return null;
    }
  },

  getCategories: async (): Promise<string[]> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener las categorías");

      const data = await response.json();
      const productos: IProducto[] = data.data ?? [];

      const categories = [...new Set(productos.map((p) => p.categoria))];
      return categories.filter((c): c is string => !!c);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      return [];
    }
  },
};
