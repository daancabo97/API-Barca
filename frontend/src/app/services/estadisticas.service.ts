// src/app/services/estadisticas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private baseUrl = 'http://localhost:3000/api/estadisticas';

  constructor(private http: HttpClient) {}

  obtenerEstadisticas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/obtener`);
  }
}
