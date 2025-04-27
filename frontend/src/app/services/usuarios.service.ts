import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl = 'http://localhost:3000/api/usuarios';

  usuarioId: string = '';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/obtener`);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, usuario);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
  }

  actualizarUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar/${id}`, usuario);
  }
}
