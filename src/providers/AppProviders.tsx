import React, { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
// Aquí puedes agregar más providers en el futuro

interface Props {
  children: ReactNode;
}

export default function AppProviders({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}
