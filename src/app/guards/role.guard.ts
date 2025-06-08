import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRole = route.data['requiredRole'];
    const usuario = this.authService.getUsuario();

    if (!usuario) {
      this.router.navigate(['/']); // No está logueado
      return false;
    }

    if (usuario.idRol === requiredRole) {
      return true; // Tiene permiso
    }

    // Redirigir según su rol real
    switch (usuario.idRol) {
      case 1:
        this.router.navigate(['/admin']);
        break;
      case 2:
        this.router.navigate(['/doctor']);
        break;
      case 3:
        this.router.navigate(['/recepcionista']);
        break;
      default:
        this.router.navigate(['/']);
    }

    return false;
  }
}