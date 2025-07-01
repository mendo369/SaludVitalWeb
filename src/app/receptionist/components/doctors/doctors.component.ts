import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/shared/interfaces/doctors';
import { Especialidad } from 'src/app/shared/interfaces/specialties';
import { DoctorsService } from 'src/app/shared/services/doctors.service';
import { SpecialtiesService } from 'src/app/shared/services/specialties.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  doctors: Medico[] = [];
  specialties: Especialidad[] = [];

  selectedDoctor: Medico | null = null;
  selectedSpecialty: Especialidad | null = null;

  constructor(
    private doctorsServices: DoctorsService,
    private specialtyService: SpecialtiesService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSpecialties();
  }

  loadDoctors() {
    this.doctorsServices.getAll().subscribe({
      next: (response) => {
        this.doctors = response;
      },
      error: (err) => {
        console.error('Error al cargar los doctores:', err);
      },
    });
  }

  loadSpecialties() {
    this.specialtyService.getAll().subscribe({
      next: (response) => {
        this.specialties = response;
      },
      error: (err) => {
        console.error('Error al cargar las especialidades:', err);
      },
    });
  }

  selectDoctor(doctor: Medico) {
    this.selectedDoctor = doctor;
    this.selectedSpecialty = null; // Limpiar si se selecciona un doctor
  }

  selectSpecialty(specialty: Especialidad) {
    this.selectedSpecialty = specialty;
    this.selectedDoctor = null; // Limpiar si se selecciona una especialidad
  }

  getSpecialtyName(id: number): string {
    const specialty = this.specialties.find((s) => s.idEspecialidad === id);
    return specialty ? specialty.nombreEspecialidad : 'Sin especialidad';
  }
}
