import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { authKeys } from "./autKey";
import { authApi } from "@/api/authApi";

export const useGetUser = (
  queryOptions?: UseQueryOptions<
    unknown,
    AxiosError,
    unknown[],
    ReturnType<(typeof authKeys)["user"]>
  >
) => {
  const obtenerComentarios = async () => {
    return await authApi.getUser();
  };
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: obtenerComentarios,
    ...queryOptions,
  });
};
