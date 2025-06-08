import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse, Usuario } from '../interfaces/auth';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly headersJson = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private loginUrl = `${environment.backendUrl}auth/login`

  constructor(private http:HttpClient){}

  login(payload:LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.loginUrl, payload, {
      headers: this.headersJson
    })
  }

    private usuarioSubject = new BehaviorSubject<Usuario | null>(null);

  setUsuario(usuario: Usuario): void {
    this.usuarioSubject.next(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuario(): Usuario | null {
    const user = localStorage.getItem('usuario');
    return user ? JSON.parse(user) : null;
  }
}
