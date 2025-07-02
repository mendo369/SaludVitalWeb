import { Component, OnInit } from '@angular/core';
import { ServicioAdicional } from 'src/app/shared/interfaces/aditional-services';
import { TipoCita } from 'src/app/shared/interfaces/appointment';
import { AditionalServicesService } from 'src/app/shared/services/aditional-services.service';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  appointmentTypes: TipoCita[] = [];
  aditionalServices: ServicioAdicional[] = [];
  loadAppointmentTypes: boolean = true;
  loadAditionalServices: boolean = true;

  constructor(
    private aditionalServiceServices: AditionalServicesService,
    private appointmentServices: ServicesService
  ) {}

  ngOnInit(): void {
    this.getAllAppointmentTypes();
    this.getAllAditionalServices();
  }

  getAllAppointmentTypes() {
    this.appointmentServices.getAllAppointmentsTypes().subscribe({
      next: (response) => {
        this.appointmentTypes = response;
        this.loadAppointmentTypes = false;
      },
      error: (error) => {
        console.error('Error al cargar tipos de cita:', error);
      },
    });
  }

  getAllAditionalServices() {
    this.aditionalServiceServices.getAllAditionalServices().subscribe({
      next: (response) => {
        this.aditionalServices = response;
        this.loadAditionalServices = false;
      },
      error: (error) => {
        console.error('Error al cargar tipos de cita:', error);
      },
    });
  }
}
