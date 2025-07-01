import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aseguradora } from '../interfaces/insurers';

@Injectable({
  providedIn: 'root'
})
export class InsurersService {

  private readonly headersJson = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    private insurersUrl = `${environment.backendUrl}aseguradoras`;
  
    constructor(private http: HttpClient) {}

    // Obtener todos los médicos
      getAll(): Observable<Aseguradora[]> {
        return this.http.get<Aseguradora[]>(this.insurersUrl, {
          headers: this.headersJson
        });
      }
}
