import { Manager, Associate } from "./user";

export interface usersContextProps {
  managers: Manager[];
  associates: Associate[];
  createEncargado: (data: FormData) => Promise<any>;
  createAsociado: (data: FormData) => Promise<any>;
  cambiarEstadoAsociado: (userId: number, activar: boolean) => Promise<any>;
  cambiarEstadoEncargado: (userId: number, activar: boolean) => Promise<any>;
  deleteAsociado: (userId: number) => Promise<any>;
  deleteEncargado: (userId: number) => Promise<any>;
}
