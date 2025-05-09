import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { productosDB } from "../../productosDB";
import { productosDBKeys } from "./productosDBKeys";
import { IProductoDBEliminar } from "@/src/models/IProducto";

export const useProductosDBEliminar = (
  mutationOptions?: UseMutationOptions<any, Error, IProductoDBEliminar>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, IProductoDBEliminar>({
    mutationFn: productosDB.eliminarProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productosDBKeys.all(),
      });
      // toast({
      //   title: "Exito.",
      //   description: "Sugerencia creada correctamente.",
      //   status: "success",
      //   isClosable: true,
      // });
    },
    onError: () => {
      // toast({
      //   title: "Ocurrio un error.",
      //   status: "error",
      //   duration: 3000,
      //   isClosable: true,
      // });
    },
    ...mutationOptions,
  });
};
