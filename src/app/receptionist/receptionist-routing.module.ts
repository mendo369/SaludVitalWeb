import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionistComponent } from './receptionist.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PatientsComponent } from './components/patients/patients.component';
import { AppointmentComponent } from './components/appointment/appointment.component';

const routes: Routes = [{
    path: '',
    component: ReceptionistComponent,
    children: [
      { path: 'doctores', component: DoctorsComponent },
      { path: 'pacientes', component: PatientsComponent },
      { path: 'citas', component: AppointmentComponent },
      // Ruta por defecto (opcional)
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionistRoutingModule { }
