import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  form: FormGroup
  mensaje: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['jugador', Validators.required]
    });
  }

  registrarUsuario(){
    if (this.form.invalid) {
      this.error = 'Formulario invalido';
      return;
    }

    this.http.post('http://localhost:3000/api/usuarios/crear', this.form.value).subscribe({
      next: () => {
        this.mensaje = 'Usuario registrado con exito';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.error.message || 'Error en el registro';
      }
    });
  }
}
