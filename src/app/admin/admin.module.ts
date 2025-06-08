import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServicesComponent } from './components/services/services.component';
import { PricesComponent } from './components/prices/prices.component';
import { InsurancesComponent } from './components/insurances/insurances.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { RecepcionistsComponent } from './components/recepcionists/recepcionists.component';
import { PatientsComponent } from './components/patients/patients.component';


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    DashboardComponent,
    ServicesComponent,
    PricesComponent,
    InsurancesComponent,
    DoctorsComponent,
    RecepcionistsComponent,
    PatientsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
