import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { InsurancesComponent } from './components/insurances/insurances.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PricesComponent } from './components/prices/prices.component';
import { ServicesComponent } from './components/services/services.component';
import { RecepcionistsComponent } from './components/recepcionists/recepcionists.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'servicios', component: ServicesComponent },     // <-- Asegúrate de crear estos componentes
      { path: 'precios', component: PricesComponent },
      { path: 'aseguradoras', component: InsurancesComponent },
      { path: 'doctores', component: DoctorsComponent },
      { path: 'recepcionistas', component: RecepcionistsComponent},
      { path: 'pacientes', component: PatientsComponent },
      // Ruta por defecto (opcional)
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
