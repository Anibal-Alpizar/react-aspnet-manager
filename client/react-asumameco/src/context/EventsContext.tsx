import { createContext } from "react";
import { eventsContextProps } from "../interfaces/context/events/eventsContextProps";

export const EventsContext = createContext<eventsContextProps | undefined>(
  undefined
);