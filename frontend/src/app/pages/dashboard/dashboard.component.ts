import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false
})
export class DashboardComponent implements OnInit {
  usuario: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.usuario = this.authService.getUsuario();
  }
}
