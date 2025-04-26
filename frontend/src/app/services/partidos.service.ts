// src/app/services/partidos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {
  private baseUrl = 'http://localhost:3000/api/partidos';

  constructor(private http: HttpClient) {}

  obtenerPartidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/obtener`);
  }
}
