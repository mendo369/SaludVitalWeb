export interface TipoCita {
  idTipoConsulta: number;
  nombreTipo: string;
  costoBase: number;
  descripcion: string;
}

// Interfaz para crear una cita (DTO)
export interface CreateCitaDto {
  paciente: { idPaciente: number };
  medico: { idMedico: number };
  tipoConsulta: { idTipoConsulta: number };
  estadoCita: { idEstado: number };
  fechaCita: string; // LocalDate -> "YYYY-MM-DD"
  horaCita: string; // LocalTime -> "HH:mm"
  observaciones?: string;
  costoConsulta: number;
  descuentoAplicado: number;
  costoTotal: number;
  usuarioRegistro: { idUsuario: number };
}

export interface Cita {
  idCita: number;
  paciente: Paciente;
  medico: Medico;
  tipoConsulta: TipoConsulta;
  estadoCita: EstadoCita;
  fechaCita: string; // LocalDate -> formato "YYYY-MM-DD"
  horaCita: string; // LocalTime -> formato "HH:mm:ss"
  observaciones: string;
  costoConsulta: number;
  descuentoAplicado: number;
  costoTotal: number;
  usuarioRegistro: Usuario;
  fechaCreacion: string; // LocalDateTime -> ISO 8601
  horaLlegada: string | null; // Puede ser null
}

// Interfaces anidadas

export interface Paciente {
  idPaciente: number;
  numeroIdentificacion: string;
  tipoIdentificacion: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string; // LocalDate
  telefono: string;
  email: string;
  direccion: string;
  tipoPaciente: TipoPaciente;
  aseguradora: Aseguradora;
  contactoEmergencia: string;
  telefonoEmergencia: string;
  activo: boolean;
  fechaRegistro: string; // LocalDate
  numeroPoliza: string;
}

export interface TipoPaciente {
  idTipoPaciente: number;
  nombreTipo: string;
  porcentajeDescuento: number;
  descripcion: string;
}

export interface Aseguradora {
  idAseguradora: number;
  nombreAseguradora: string;
  telefono: string;
  email: string;
  activa: boolean;
  descuento: number;
}

export interface Medico {
  idMedico: number;
  numeroLicencia: string;
  nombre: string;
  apellido: string;
  idEspecialidad: number;
  telefono: string;
  email: string;
  horarioInicio: string; // LocalTime
  horarioFin: string; // LocalTime
  activo: boolean;
  idUsuario: number | null;
}

export interface TipoConsulta {
  idTipoConsulta: number;
  nombreTipo: string;
  costoBase: number;
  descripcion: string;
}

export interface EstadoCita {
  idEstado: number;
  nombreEstado: string;
  descripcion: string;
}

export interface Usuario {
  idUsuario: number;
  username: string;
  passwordHash: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  idRol: number;
  activo: boolean;
  fechaCreacion: string; // LocalDateTime
  ultimoAcceso: string | null;
}

export interface UpdateEstadoCitaDto {
  idEstado: number;
}