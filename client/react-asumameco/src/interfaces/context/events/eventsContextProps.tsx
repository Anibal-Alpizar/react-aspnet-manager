import { Event } from "../../../interfaces/context/events/event";

export interface eventsContextProps {
  events: Event[];
  errors: string[];
  loadEvents: () => void;
  createEvent: (
    nombre: string,
    IdUsuarioCreador: number,
    direccion: string,
    fecha: string,
    descripcion: string,
    imagen: File
  ) => any;
  participateEvent: (IdEvento: number, IdAsociado: number) => any;
  deleteEvent: (IdEvento: number) => any;
  getAssistance: (idEvento: number) => any;
}
