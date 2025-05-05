const apiUrl = process.env.API_URL;
export const productoAPI = {
  getProductos: async () => {
    const response = await fetch(`${apiUrl}`);
    return response.json();
  },
};
