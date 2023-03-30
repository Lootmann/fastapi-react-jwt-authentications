import React, { createContext } from "react";

export const AuthContext = createContext<UserType | null>(null);
