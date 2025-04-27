import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  standalone: false,
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  form!: FormGroup;
  mensaje: string = '';
  mensajeError: string = '';
  editando: boolean = false;
  usuarioId: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', Validators.required],
      posicion: [''],
    });
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
      },
    });
  }

  registrarUsuario() {
    if (this.form.invalid) {
      return;
    }

    const nuevoUsuario = this.form.value;

    // Eliminar la propiedad 'posicion' si el rol no es jugador
    if (nuevoUsuario.rol !== 'jugador') {
      delete nuevoUsuario.posicion;
    }

    if(this.editando) {
      this.usuariosService.actualizarUsuario(this.usuarioId, nuevoUsuario).subscribe({
        next: () => {
          this.mensaje = 'Usuario actualizado correctamente';
          this.form.reset({ rol: 'usuario' });
          this.obtenerUsuarios();
          this.editando = false;
          this.usuarioId = '';

          // Mostrar mensaje de notificacion cuando se edite el usuario y quitar el mensaje  en 3 segundos
          setTimeout(() => {this.mensaje = '';}, 3000);
        },
        error: (err) => {
          console.error('Error al actualizar usuario', err);
        },
      });
    } else {
    this.usuariosService.crearUsuario(nuevoUsuario).subscribe({
      next: () => {
        this.mensaje = 'Usuario creado correctamente';
        this.form.reset({ rol: 'usuario' });
        this.obtenerUsuarios();

        // Mostrar mensaje de notificacion cuando se cree el usuario y quitar el mensaje  en 3 segundos
        setTimeout(() => {this.mensaje = '';}, 3000);
      },
      error: (err) => {
        console.error('Error al crear usuario', err);
      },
    });
  }
}

  eliminarUsuario(id: string) {
    this.usuariosService.eliminarUsuario(id).subscribe({
      next: () => {
        this.mensaje = 'Usuario eliminado correctamente';
        this.obtenerUsuarios();

        // Mostrar mensaje de notificacion cuando se elimine el usuario y quitar el mensaje  en 3 segundos
        setTimeout(() => {
          this.mensaje = '';
        }, 3000);
      },
      error: (err) => {
        console.error('Error al eliminar usuario', err);
      },
    });
  }

  editarUsuario(usuario: any) {
    this.form.patchValue({
      nombre: usuario.nombre,
      correo: usuario.correo,
      contrasena: '',
      rol: usuario.rol,
      posicion: usuario.posicion || '',
    });

    this.usuarioId = usuario._id;
    this.editando = true;
  }
}
