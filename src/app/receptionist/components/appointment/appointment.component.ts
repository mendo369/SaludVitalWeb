import { Component, OnInit } from '@angular/core';
import { TipoCita } from 'src/app/shared/interfaces/appointment';
import { Medico } from 'src/app/shared/interfaces/doctors';
import { Aseguradora } from 'src/app/shared/interfaces/insurers';
import { DoctorsService } from 'src/app/shared/services/doctors.service';
import { InsurersService } from 'src/app/shared/services/insurers.service';
import { PatientsService } from 'src/app/shared/services/patients.service';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit{

  appointmentTypes: TipoCita[] = [];
    loadAppointmentTypes:boolean = true;
    insurers: Aseguradora[] = [];
    loadInsurers:boolean = true;
    doctors: Medico[] = [];
  

  constructor(private appointmentServices:ServicesService, private patientServices:PatientsService, private doctorServices:DoctorsService, private insuranceServices:InsurersService){}

  ngOnInit(): void {
    this.getAllAppointmentTypes()
    this.getAllInsurers()
    this.loadDoctors()
  }

  getAllAppointmentTypes() {
    this.appointmentServices.getAllAppointmentsTypes().subscribe({
      next:response=>{
        this.appointmentTypes = response
        this.loadAppointmentTypes = false;
      },error:error=>{
        console.error(error)
      }
    });
  }
  getAllInsurers() {
    this.insuranceServices.getAll().subscribe({
      next:response=>{
        this.insurers = response
        this.loadInsurers = false;
      },error:error=>{
        console.error(error)
      }
    });
  }
  
  loadDoctors() {
    this.doctorServices.getAll().subscribe({
      next: (response) => {
        this.doctors = response;
      },
      error: (err) => {
        console.error('Error al cargar los doctores:', err);
      },
    });
  }
}
