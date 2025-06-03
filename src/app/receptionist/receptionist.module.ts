import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionistRoutingModule } from './receptionist-routing.module';
import { ReceptionistComponent } from './receptionist.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    ReceptionistComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReceptionistRoutingModule
  ]
})
export class ReceptionistModule { }
