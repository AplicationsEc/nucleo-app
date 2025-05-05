import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { productosKeys } from "./productosKeys";
import { IProducto } from "@/src/models/IProducto";
import { productosAPI } from "@/src/api/productosAPI";
export const useProductoById = (
  id: number,
  queryOptions?: UseQueryOptions<
    IProducto | null,
    AxiosError,
    IProducto | null,
    ReturnType<(typeof productosKeys)["proFilterById"]>
  >
) => {
  const obtenerCategoriaByUuid = async () => {
    return await productosAPI.getProductoById(id);
  };
  return useQuery({
    queryKey: ["productos", "pro", id],
    queryFn: obtenerCategoriaByUuid,
    ...queryOptions,
  });
};
