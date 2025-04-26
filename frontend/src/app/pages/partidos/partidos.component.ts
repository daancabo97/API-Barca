// src/app/pages/partidos/partidos.component.ts
import { Component, OnInit } from '@angular/core';
import { PartidosService } from '../../services/partidos.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css'],
  standalone: false
})
export class PartidosComponent implements OnInit {
  partidos: any[] = [];

  constructor(private partidosService: PartidosService) {}

  ngOnInit(): void {
    this.partidosService.obtenerPartidos().subscribe({
      next: (res) => {
        this.partidos = res;
      },
      error: (err) => {
        console.error('Error al obtener partidos', err);
      }
    });
  }
}
