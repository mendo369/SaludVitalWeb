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
  filteredDoctors: Medico[] = [];
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
      this.filteredDoctors = response; // Inicializamos aquí
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

  onSpecialtyChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const selectedId = Number(selectElement.value);

  if (selectedId) {
    this.filteredDoctors = this.doctors.filter(
      (doctor) => doctor.idEspecialidad === selectedId
    );
  } else {
    this.filteredDoctors = [...this.doctors]; // Mostrar todos si no hay selección
  }
}
}
