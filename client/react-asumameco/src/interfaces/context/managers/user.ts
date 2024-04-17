export interface Associate {
  id: number;
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  password: string;
  estado: string;
}

export interface Manager {
  id: number;
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  password: string;
  activo: string;
  justificacion: string;
}
