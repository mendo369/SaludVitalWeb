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
  
    // Obtener todos los médicos
    getAllAditionalServices(): Observable<ServicioAdicional[]> {
      return this.http.get<[]>(this.aditionalServicesUrl, {
        headers: this.headersJson,
      });
    }
  
    update(service: ServicioAdicional): Observable<ServicioAdicional> {
    return this.http.put<ServicioAdicional>(`${this.aditionalServicesUrl}/${service.idServicio}`, service);
  }
}
