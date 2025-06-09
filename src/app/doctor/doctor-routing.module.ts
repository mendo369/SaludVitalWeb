import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { PatientsComponent } from './components/patients/patients.component';

const routes: Routes = [{ path: '',
    component: DoctorComponent,
    children: [
      { path: 'pacientes', component: PatientsComponent },
      { path: 'citas', component: AppointmentComponent },
      // Ruta por defecto (opcional)
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
