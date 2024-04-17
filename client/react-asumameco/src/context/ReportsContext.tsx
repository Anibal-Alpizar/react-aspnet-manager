import { createContext } from "react";
import { reportsContextProps } from "../interfaces/context/reports/reportsContextProps";

export const ReportsContext = createContext<reportsContextProps | undefined>(
  undefined
);
