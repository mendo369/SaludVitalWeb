export interface LoginRequest{
    username:string;
    password:string;
}

export interface LoginResponse {
  token: string;
  idUsuario: number;
  username: string;
  nombre: string;
  apellido: string;
  idRol: number;
}

export interface Usuario {
  token: string;
  idUsuario: number;
  username: string;
  nombre: string;
  apellido: string;
  idRol: number;
}