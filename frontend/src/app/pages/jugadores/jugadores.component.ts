// src/app/pages/jugadores/jugadores.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
  standalone: false
})
export class JugadoresComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
      }
    });
  }
}
