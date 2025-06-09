import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PatientsComponent } from './components/patients/patients.component';


@NgModule({
  declarations: [
    DoctorComponent,
    AppointmentComponent,
    SidebarComponent,
    PatientsComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule
  ]
})
export class DoctorModule { }
