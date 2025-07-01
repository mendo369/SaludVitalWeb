import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/shared/interfaces/patients';
import { PatientsService } from 'src/app/shared/services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit{
    patients: Paciente[] = [];
    selectedPatient: Paciente | null = null;
  
    constructor(private patientsService: PatientsService) {}
  
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
      if(this.selectedPatient == patient){
        this.selectedPatient = null;
        return
      }
      this.selectedPatient = patient;
    }
}
