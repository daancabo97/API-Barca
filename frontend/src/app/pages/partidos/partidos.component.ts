import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartidosService } from '../../services/partidos.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css'],
  standalone: false,
})
export class PartidosComponent implements OnInit {
  partidos: any[] = [];
  jugadoresDisponibles: any[] = [];
  tecnicosDisponibles: any[] = [];
  jugadoresConvocados: any[] = [];

  form!: FormGroup;
  mensaje: string = '';
  editando: boolean = false;
  partidoId: string = '';

  jugadorSeleccionado: any = null;

  constructor(
    private fb: FormBuilder,
    private partidosService: PartidosService,
    private usuariosService: UsuariosService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.obtenerPartidos();
    this.obtenerUsuarios();
  }

  crearFormulario() {
    this.form = this.fb.group({
      equipoRival: ['', Validators.required],
      fecha: ['', Validators.required],
      lugar: ['', Validators.required],
      estadio: ['', Validators.required],
      competencia: ['', Validators.required],
      tecnico: ['', Validators.required],
    });
  }

  obtenerPartidos() {
    this.partidosService.obtenerPartidos().subscribe({
      next: (res) => {
        this.partidos = res;
      },
      error: (err: any) => {
        console.error('Error al obtener partidos', err);
      }
    });
  }

  obtenerUsuarios() {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (res) => {
        this.jugadoresDisponibles = res.filter((user: any) => user.rol === 'jugador');
        this.tecnicosDisponibles = res.filter((user: any) => user.rol === 'tecnico');
      },
      error: (err: any) => {
        console.error('Error al obtener usuarios', err);
      }
    });
  }

  agregarJugador() {
    if (!this.jugadorSeleccionado) return;

    this.jugadoresConvocados.push({
      jugador: this.jugadorSeleccionado._id,
      nombre: this.jugadorSeleccionado.nombre,
      posicion: this.jugadorSeleccionado.posicion
    });

    this.jugadorSeleccionado = null;
  }

  eliminarJugador(index: number) {
    this.jugadoresConvocados.splice(index, 1);
  }

  registrarPartido() {
    if (this.form.invalid || this.jugadoresConvocados.length === 0) {
      console.error('Formulario inválido o sin jugadores');
      return;
    }

    const nuevoPartido = {
      ...this.form.value,
      jugadoresConvocados: this.jugadoresConvocados.map(j => ({
        jugador: j.jugador,
        posicion: j.posicion
      }))
    };

    if (this.editando) {
      this.partidosService.actualizarPartido(this.partidoId, nuevoPartido).subscribe({
        next: () => {
          this.mensaje = 'Partido actualizado correctamente';
          this.obtenerPartidos();
          this.editando = false;
          this.partidoId = '';
          this.jugadoresConvocados = [];
          this.crearFormulario();
          setTimeout(() => { this.mensaje = ''; }, 3000);
        },
        error: (err) => {
          console.error('Error al actualizar partido', err);
        },
      });
    } else {
      this.partidosService.crearPartido(nuevoPartido).subscribe({
        next: () => {
          this.mensaje = 'Partido creado correctamente';
          this.obtenerPartidos();
          this.jugadoresConvocados = [];
          this.crearFormulario();
          setTimeout(() => { this.mensaje = ''; }, 3000);
        },
        error: (err) => {
          console.error('Error al crear partido', err);
        },
      });
    }
  }

  eliminarPartido(id: string) {
    this.partidosService.eliminarPartido(id).subscribe({
      next: () => {
        this.mensaje = 'Partido eliminado correctamente';
        this.obtenerPartidos();
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error: (err) => {
        console.error('Error al eliminar partido', err);
      },
    });
  }

  editarPartido(partido: any) {
    this.form.patchValue({
      equipoRival: partido.equipoRival,
      fecha: partido.fecha,
      lugar: partido.lugar,
      estadio: partido.estadio,
      competencia: partido.competencia,
      tecnico: partido.tecnico,
    });

    this.jugadoresConvocados = partido.jugadoresConvocados.map((jug: any) => ({
      jugador: jug.jugador,
      nombre: this.jugadoresDisponibles.find(j => j._id === jug.jugador)?.nombre || 'Desconocido',
      posicion: jug.posicion
    }));

    this.partidoId = partido._id;
    this.editando = true;
  }
}
