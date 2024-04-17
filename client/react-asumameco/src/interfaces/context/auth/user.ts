export interface User {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  clave: string;
  idRol: number;
  idRolNavigation: {
    id: number;
    nombre: string;
  };
}
