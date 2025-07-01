export interface Medico {
  idMedico: number;
  numeroLicencia: string;
  nombre: string;
  apellido: string;
  idEspecialidad: number;
  telefono: string;
  email: string;
  horarioInicio: string;  // Formato HH:mm:ss
  horarioFin: string;     // Formato HH:mm:ss
  activo: boolean;
  idUsuario: number | null;
}

export interface CreateMedicoDto {
  numeroLicencia: string;
  nombre: string;
  apellido: string;
  idEspecialidad: number;
  telefono: string;
  horarioInicio: string;  // Ejemplo: "08:00"
  horarioFin: string;     // Ejemplo: "16:00"
  activo: boolean;
  idRol: number;
}
