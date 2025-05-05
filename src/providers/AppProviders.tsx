import React, { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Aquí puedes agregar más providers en el futuro

interface Props {
  children: ReactNode;
}
const queryClient = new QueryClient();
export default function AppProviders({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
