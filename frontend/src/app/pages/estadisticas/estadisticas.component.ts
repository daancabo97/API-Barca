// src/app/pages/estadisticas/estadisticas.component.ts
import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from '../../services/estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
  standalone: false
})
export class EstadisticasComponent implements OnInit {
  estadisticas: any[] = [];

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.estadisticasService.obtenerEstadisticas().subscribe({
      next: (res) => {
        this.estadisticas = res;
      },
      error: (err) => {
        console.error('Error al obtener estadísticas', err);
      }
    });
  }
}
