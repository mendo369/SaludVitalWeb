import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Paciente } from '../interfaces/patients';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private readonly headersJson = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private patientsUrl = `${environment.backendUrl}pacientes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.patientsUrl, {
      headers: this.headersJson,
    });
  }
}
