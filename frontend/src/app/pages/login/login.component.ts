import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.form.invalid) {
      this.error = 'Formulario invalido';
      return;
    }

    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error.message || 'Error en el login';
      },
    });
  }
}
