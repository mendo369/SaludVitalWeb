import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicioAdicional } from '../interfaces/aditional-services';

@Injectable({
  providedIn: 'root'
})
export class AditionalServicesService {

  private readonly headersJson = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private aditionalServicesUrl = `${environment.backendUrl}servicios-adicionales`;

  constructor(private http: HttpClient) {}

  // Obtener todos los servicios adicionales
  getAllAditionalServices(): Observable<ServicioAdicional[]> {
    return this.http.get<ServicioAdicional[]>(this.aditionalServicesUrl, {
      headers: this.headersJson,
    });
  }

  // Obtener estadísticas mensuales de servicios adicionales
  getMonthlyStats(): Observable<{ cantidad_servicios: number; total_ingresos: number }> {
    const url = `${this.aditionalServicesUrl}/estadisticas/mensual`;
    return this.http.get<{ cantidad_servicios: number; total_ingresos: number }>(url, {
      headers: this.headersJson
    });
  }

  // Obtener servicio más solicitado
  getMostRequestedService(): Observable<{ nombre_servicio: string; total_cantidad: number }> {
    const url = `${this.aditionalServicesUrl}/estadisticas/mas-solicitado`;
    return this.http.get<{ nombre_servicio: string; total_cantidad: number }>(url, {
      headers: this.headersJson
    });
  }

  // Actualizar un servicio
  update(service: ServicioAdicional): Observable<ServicioAdicional> {
    return this.http.put<ServicioAdicional>(
      `${this.aditionalServicesUrl}/${service.idServicio}`,
      service,
      { headers: this.headersJson }
    );
  }
}