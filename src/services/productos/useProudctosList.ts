import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { productosKeys } from "./productosKeys";
import { IProducto } from "@/src/models/IProducto";
import { AxiosErrorType } from "@/src/utils/Common";
import { productosAPI } from "@/src/api/productosAPI";
export const useProudctosList = (
  queryOptions?: UseQueryOptions<
    IProducto[],
    AxiosErrorType,
    IProducto[],
    ReturnType<(typeof productosKeys)["list"]>
  >
) => {
  const getProductos = async () => {
    return await productosAPI.getProductos();
  };
  return useQuery({
    queryKey: ["productos", "list"],
    queryFn: getProductos,
    ...queryOptions, // si tienes más config
  });
};
