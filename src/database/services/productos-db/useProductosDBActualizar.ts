import { IProducto } from "@/src/models/IProducto";
import { UseMutationOptions } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { productosDBKeys } from "./productosDBKeys";
import { productosDB } from "../../productosDB";

export const useProductosDBActualizar = (
  mutationOptions?: UseMutationOptions<number, Error, IProducto>
) => {
  const queryClient = useQueryClient();

  return useMutation<number, Error, IProducto>({
    mutationFn: productosDB.actualizarProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productosDBKeys.all() });
      //   toast({
      //     title: 'Exito.',
      //     description: 'Sugerencia creada correctamente.',
      //     status: 'success',
      //     isClosable: true
      //   });
      console.log("Producto actualizado correctamente");
    },
    onError: (error) => {
      console.log("Error al actualizar producto", error);
      //   toast({ title: 'Ocurrio un error.', status: 'error', duration: 3000, isClosable: true });
    },
    ...mutationOptions,
  });
};
