import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Especialidad } from '../interfaces/specialties';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {
  private readonly headersJson = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private specialtiesUrl = `${environment.backendUrl}especialidades`;

  constructor(private http: HttpClient) {}

  // Obtener todas las especialidades
  getAll(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.specialtiesUrl, {
      headers: this.headersJson
    });
  }

  // Obtener especialidad por ID
  getById(id: number): Observable<Especialidad> {
    const url = `${this.specialtiesUrl}/${id}`;
    return this.http.get<Especialidad>(url, {
      headers: this.headersJson
    });
  }

  // Crear una nueva especialidad
  create(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(this.specialtiesUrl, especialidad, {
      headers: this.headersJson
    });
  }

  // Actualizar una especialidad existente
  update(id: number, especialidad: Especialidad): Observable<Especialidad> {
    const url = `${this.specialtiesUrl}/${id}`;
    return this.http.put<Especialidad>(url, especialidad, {
      headers: this.headersJson
    });
  }

  // Eliminar una especialidad
  delete(id: number): Observable<void> {
    const url = `${this.specialtiesUrl}/${id}`;
    return this.http.delete<void>(url, {
      headers: this.headersJson
    });
  }
}
