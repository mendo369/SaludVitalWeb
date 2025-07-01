import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionistRoutingModule } from './receptionist-routing.module';
import { ReceptionistComponent } from './receptionist.component';
import { PatientsComponent } from './components/patients/patients.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CostsComponent } from './components/costs/costs.component';


@NgModule({
  declarations: [
    ReceptionistComponent,
    PatientsComponent,
    AppointmentComponent,
    DoctorsComponent,
    SidebarComponent,
    CostsComponent
  ],
  imports: [
    CommonModule,
    ReceptionistRoutingModule
  ]
})
export class ReceptionistModule { }
