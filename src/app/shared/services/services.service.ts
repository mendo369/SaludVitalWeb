import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoCita } from '../interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private readonly headersJson = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    
      private appointmentsUrl = `${environment.backendUrl}tipos-consulta`;
    
      constructor(private http: HttpClient) {}
  
      // Obtener todos los médicos
        getAllAppointmentsTypes(): Observable<TipoCita[]> {
          return this.http.get<TipoCita[]>(this.appointmentsUrl, {
            headers: this.headersJson
          });
        }
}
