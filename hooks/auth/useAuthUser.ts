import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { authKeys } from "./autKey";
import { authApi } from "@/api/authApi";
import { IUserLogin } from "@/models/IUserLogin";

export const useGetUser = (
  queryOptions?: UseQueryOptions<
    IUserLogin | undefined,
    AxiosError,
    IUserLogin | undefined,
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
