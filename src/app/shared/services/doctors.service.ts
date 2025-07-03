import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateMedicoDto, Medico } from '../interfaces/doctors';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  private readonly headersJson = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private doctorsUrl = `${environment.backendUrl}medicos`;

  constructor(private http: HttpClient) {}

  // Obtener todos los médicos
  getAll(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.doctorsUrl, {
      headers: this.headersJson
    });
  }

  // Obtener un médico por ID
  getById(id: number): Observable<Medico> {
    const url = `${this.doctorsUrl}/${id}`;
    return this.http.get<Medico>(url, {
      headers: this.headersJson
    });
  }

  // Crear un nuevo médico
  create(medico: CreateMedicoDto): Observable<Medico> {
    return this.http.post<Medico>(this.doctorsUrl, medico, {
      headers: this.headersJson
    });
  }

  // Actualizar un médico existente
  update(id: number, medico: Medico): Observable<Medico> {
    const url = `${this.doctorsUrl}/${id}`;
    return this.http.put<Medico>(url, medico, {
      headers: this.headersJson
    });
  }

  // Eliminar un médico por ID
  delete(id: number): Observable<void> {
    const url = `${this.doctorsUrl}/${id}`;
    return this.http.delete<void>(url, {
      headers: this.headersJson
    });
  }

  
}
