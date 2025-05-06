import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { productosDBKeys } from "./productosDBKeys";
import { IProducto } from "@/src/models/IProducto";
import { AxiosErrorType } from "@/src/utils/Common";
import { productosDB } from "../../productosDB";
export const useProudctosDBList = (
  queryOptions?: UseQueryOptions<
    IProducto[],
    AxiosErrorType,
    IProducto[],
    ReturnType<(typeof productosDBKeys)["list"]>
  >
) => {
  const getProductos = async () => {
    return await productosDB.obtenerProductos();
  };
  return useQuery({
    queryKey: ["productos-db", "list"],
    queryFn: getProductos,
    ...queryOptions,
  });
};
