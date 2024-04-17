import { createContext } from "react";
import { authContextProps } from "../interfaces/context/auth/authContextProps";

export const AuthContext = createContext<authContextProps | undefined>(
  undefined
);
