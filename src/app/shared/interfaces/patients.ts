export interface Paciente {
    idPaciente: number;
    numeroIdentificacion: string;
    tipoIdentificacion: string; // Ej: "CC", "TI", "Pasaporte"
    nombre: string;
    apellido: string;
    fechaNacimiento: string; // Formato ISO: "YYYY-MM-DD"
    telefono: string;
    email: string;
    direccion: string;
    tipoPaciente: TipoPaciente;
    aseguradora: Aseguradora;
    contactoEmergencia: string;
    telefonoEmergencia: string;
    activo: boolean;
    fechaRegistro: string; // Formato ISO: "YYYY-MM-DD"
    numeroPoliza: string;
  }

  export interface TipoPaciente {
    idTipoPaciente: number;
    nombreTipo: string;
    porcentajeDescuento: number; // Ej: 0.10 = 10%
    descripcion: string;
  }

  export interface Aseguradora {
    idAseguradora: number;
    nombreAseguradora: string;
    telefono: string;
    email: string;
    activa: boolean;
  }