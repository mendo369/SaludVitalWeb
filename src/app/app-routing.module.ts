import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [RoleGuard],
    data: { requiredRole: 1 } // Solo Admin puede entrar
  },
  {
    path: 'doctor',
    loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule),
    canActivate: [RoleGuard],
    data: { requiredRole: 2 } // Solo Doctor
  },
  {
    path: 'recepcionista',
    loadChildren: () => import('./receptionist/receptionist.module').then(m => m.ReceptionistModule),
    canActivate: [RoleGuard],
    data: { requiredRole: 3 } // Solo Recepcionista
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}