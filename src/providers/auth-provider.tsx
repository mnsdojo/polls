import { createContext } from "react";

const AuthContext = createContext({});

import React from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
