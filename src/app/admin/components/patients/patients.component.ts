import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/shared/interfaces/appointment';
import { Paciente } from 'src/app/shared/interfaces/patients';
import { AppointmentsService } from 'src/app/shared/services/appointments.service';
import { PatientsService } from 'src/app/shared/services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients: Paciente[] = [];
  patientAppointments:Cita[] = []
  selectedPatient: Paciente | null = null;

  constructor(private patientsService: PatientsService, private appointmentServices:AppointmentsService) {}

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() {
    this.patientsService.getAll().subscribe({
      next: (response) => {
        this.patients = response;
        console.log(response);
      },
      error: (error) => {
        console.error('Error al cargar pacientes:', error);
      }
    });
  }

  selectPatient(patient: Paciente) {
  this.selectedPatient = this.selectedPatient === patient ? null : patient;

  if (this.selectedPatient) {
    this.getPatientAppointments(this.selectedPatient.idPaciente);
  } else {
    this.patientAppointments = [];
  }
}

  getPatientAppointments(patientId:number){
    this.appointmentServices.getAllPatientAppointments(patientId).subscribe({
      next: (response) => {
        this.patientAppointments = response;
        console.log(response);
      },
      error: (error) => {
        console.error('Error al cargar pacientes:', error);
      }
    })
  }
}
