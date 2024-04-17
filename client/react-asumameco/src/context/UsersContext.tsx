import { createContext } from "react";
import { usersContextProps } from "../interfaces/context/managers/usersContextProps";

export const UsersContext = createContext<usersContextProps | undefined>(
  undefined
);
