import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Cita,
  CreateCitaDto,
  UpdateEstadoCitaDto,
} from '../interfaces/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private readonly headersJson = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private appointmentsUrl = `${environment.backendUrl}citas`;

  constructor(private http: HttpClient) {}

  getAllAppointments(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.appointmentsUrl, {
      headers: this.headersJson,
    });
  }

  getAllPatientAppointments(patientId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(
      `${this.appointmentsUrl}/paciente/${patientId}`,
      {
        headers: this.headersJson,
      }
    );
  }

  createCita(cita: CreateCitaDto): Observable<Cita> {
    return this.http.post<Cita>(this.appointmentsUrl, cita, {
      headers: this.headersJson,
    });
  }

  updateEstadoCita(idCita: number, dto: UpdateEstadoCitaDto): Observable<Cita> {
    const url = `${this.appointmentsUrl}/${idCita}`;
    return this.http.put<Cita>(
      url,
      { estadoCita: dto },
      { headers: this.headersJson }
    );
  }

  // Contar cuántas citas están canceladas (estado ID 4)
  countCanceledAppointments(): Observable<number> {
    const url = `${this.appointmentsUrl}/estadisticas/canceladas`;
    return this.http.get<number>(url, { headers: this.headersJson });
  }

  // Obtener todas las citas canceladas
  getAllCanceledAppointments(): Observable<Cita[]> {
    const url = `${this.appointmentsUrl}/canceladas`;
    return this.http.get<Cita[]>(url, { headers: this.headersJson });
  }

  // Obtener estadísticas por médico
  getStatsByMedico(): Observable<Map<string, any>[]> {
    const url = `${this.appointmentsUrl}/estadisticas/por-medico`;
    return this.http.get<Map<string, any>[]>(url, {
      headers: this.headersJson,
    });
  }
}
