import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model:LoginRequest = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

onSubmit() {
    this.authService.login(this.model).subscribe({
      next: (usuario) => {
        // Guardar datos del usuario (opcional)
        this.authService.setUsuario(usuario);

        // Redirigir según rol
        switch (usuario.idRol) {
          case 1: // Admin
            this.router.navigate(['/admin']);
            break;
          case 2: // Doctor
            this.router.navigate(['/doctor']);
            break;
          case 3: // Recepcionista
            this.router.navigate(['/recepcionista']);
            break;
          default:
            this.router.navigate(['/']); // Volver al login si no coincide
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
      }
    });
  }
}