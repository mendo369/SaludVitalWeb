import { Component } from '@angular/core';
import { TipoCita, Aseguradora, Medico, Paciente, Cita, CreateCitaDto, UpdateEstadoCitaDto } from 'src/app/shared/interfaces/appointment';
import { AppointmentsService } from 'src/app/shared/services/appointments.service';
import { DoctorsService } from 'src/app/shared/services/doctors.service';
import { InsurersService } from 'src/app/shared/services/insurers.service';
import { PatientsService } from 'src/app/shared/services/patients.service';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  
    // Listados
    appointmentTypes: TipoCita[] = [];
    insurers: Aseguradora[] = [];
    doctors: Medico[] = [];
    pacientes: Paciente[] = [];
    citas: Cita[] = [];
  
    // Estados de carga
    loadAppointmentTypes: boolean = true;
    loadInsurers: boolean = true;
    loadPacientes: boolean = true;
    loadCitas: boolean = true;
  
    // Formulario
    selectedPaciente: number | null = null;
    selectedMedico: number | null = null;
    selectedTipoConsulta: number | null = null;
    fechaCita: string = '';
    horaCita: string = '';
    observaciones: string = '';
    costoConsulta: number = 0;
    descuentoAplicado: number = 0;
    costoTotal: number = 0;
    aseguradoraId: number | null = null;
  
  
  
    // Para crear paciente
    newPaciente: Partial<Paciente> = {
      numeroIdentificacion: '',
      tipoIdentificacion: 'CC',
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      telefono: '',
      email: '',
      direccion: '',
      contactoEmergencia: '',
      telefonoEmergencia: '',
      tipoPaciente: {
        idTipoPaciente: 0,
        nombreTipo: '',
        porcentajeDescuento: 0,
        descripcion: '',
      },
      aseguradora: {
        idAseguradora: 0,
        nombreAseguradora: '',
        telefono: '',
        email: '',
        activa: false,
        descuento: 0,
      },
      numeroPoliza: '',
      activo: true,
      fechaRegistro: new Date().toISOString().split('T')[0],
    };
  
    constructor(
      private appointmentServices: ServicesService,
      private patientServices: PatientsService,
      private doctorServices: DoctorsService,
      private insuranceServices: InsurersService,
      private citaService: AppointmentsService
    ) {}
  
    ngOnInit(): void {
      this.getAllAppointmentTypes();
      this.getAllInsurers();
      this.loadDoctors();
      this.loadPacientesList();
      this.loadAllAppointments();
    }
  
    // 🔁 Carga de datos
  
    getAllAppointmentTypes() {
      this.appointmentServices.getAllAppointmentsTypes().subscribe({
        next: (response) => {
          this.appointmentTypes = response;
          this.loadAppointmentTypes = false;
        },
        error: (error) => console.error(error),
      });
    }
  
    getAllInsurers() {
      this.insuranceServices.getAll().subscribe({
        next: (response) => {
          this.insurers = response;
          this.loadInsurers = false;
        },
        error: (error) => console.error(error),
      });
    }
  
    loadDoctors() {
      this.doctorServices.getAll().subscribe({
        next: (response) => (this.doctors = response),
        error: (err) => console.error('Error al cargar los doctores:', err),
      });
    }
  
    loadPacientesList() {
      this.patientServices.getAll().subscribe({
        next: (response) => {
          this.pacientes = response;
          this.loadPacientes = false;
        },
        error: (err) => console.error('Error al cargar pacientes:', err),
      });
    }
  
    loadAllAppointments() {
      this.citaService.getAppointmentsByDoctor().subscribe({
        next: (response) => {
          this.citas = response;
          this.loadCitas = false;
        },
        error: (err) => console.error('Error al cargar citas:', err),
      });
    }
  
    onAseguradoraChange(event: Event) {
      const aseguradoraId = Number((event.target as HTMLSelectElement).value);
      const aseguradora = this.insurers.find(
        (a) => a.idAseguradora === aseguradoraId
      );
      this.descuentoAplicado = aseguradora ? aseguradora.descuento : 0;
      this.calcularCostoFinal();
    }
  
    calcularCostoFinal() {
      if (this.costoConsulta > 0 && this.descuentoAplicado >= 0) {
        const porcentajeDescuento = this.descuentoAplicado / 100;
        this.costoTotal = this.costoConsulta * (1 - porcentajeDescuento);
      } else {
        this.costoTotal = this.costoConsulta;
      }
    }
  
    // 🗓️ Agendar cita
    scheduleAppointment() {
      if (
        !this.selectedPaciente ||
        !this.selectedMedico ||
        !this.selectedTipoConsulta ||
        !this.fechaCita ||
        !this.horaCita
      ) {
        alert('Por favor completa todos los campos obligatorios.');
        return;
      }
  
      const nuevaCita = {
        paciente: { idPaciente: this.selectedPaciente },
        medico: { idMedico: this.selectedMedico },
        tipoConsulta: { idTipoConsulta: this.selectedTipoConsulta },
        estadoCita: { idEstado: 1 }, // Por defecto: "Agendada"
        fechaCita: this.fechaCita,
        horaCita: this.horaCita,
        observaciones: this.observaciones,
        costoConsulta: this.costoConsulta,
        descuentoAplicado: this.descuentoAplicado,
        costoTotal: this.costoTotal,
        usuarioRegistro: { idUsuario: 1 }, // Cambiar por ID dinámico si es necesario
      };
  
      this.citaService.createCita(nuevaCita).subscribe({
        next: (citaGuardada) => {
          this.citas.unshift(citaGuardada);
          alert('Cita agendada exitosamente');
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al agendar cita:', err);
          alert('No se pudo agendar la cita');
        },
      });
    }
  
    resetForm() {
      this.selectedPaciente = null;
      this.selectedMedico = null;
      this.selectedTipoConsulta = null;
      this.fechaCita = '';
      this.horaCita = '';
      this.observaciones = '';
      this.costoConsulta = 0;
      this.descuentoAplicado = 0;
      this.costoTotal = 0;
      this.aseguradoraId = null;
      this.newPaciente = {};
    }
  
    onPacienteChange(event: Event) {
      const idPaciente = Number((event.target as HTMLSelectElement).value);
      const paciente = this.pacientes.find((p) => p.idPaciente === idPaciente);
  
      if (paciente && paciente.aseguradora) {
        this.aseguradoraId = paciente.aseguradora.idAseguradora;
        this.descuentoAplicado = paciente.aseguradora.descuento || 0;
      } else {
        this.aseguradoraId = null;
        this.descuentoAplicado = 0;
      }
  
      this.calcularCostoFinal();
    }
  
    onTipoConsultaChange(event: Event) {
      const tipoConsultaId = Number((event.target as HTMLSelectElement).value);
      const tipoConsulta = this.appointmentTypes.find(
        (t) => t.idTipoConsulta === tipoConsultaId
      );
  
      if (tipoConsulta) {
        this.costoConsulta = tipoConsulta.costoBase || 0;
        this.calcularCostoFinal();
      }
    }
  
    guardarCita() {
      // Validación básica
      if (
        !this.selectedPaciente ||
        !this.selectedMedico ||
        !this.selectedTipoConsulta ||
        !this.fechaCita ||
        !this.horaCita
      ) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
      }
  
      // Crear el DTO para enviar al backend
      const nuevaCita: CreateCitaDto = {
        paciente: { idPaciente: this.selectedPaciente },
        medico: { idMedico: this.selectedMedico },
        tipoConsulta: { idTipoConsulta: this.selectedTipoConsulta },
        estadoCita: { idEstado: 1 }, // Por defecto: "Agendada"
        fechaCita: this.fechaCita, // Formato esperado: 'YYYY-MM-DD'
        horaCita: this.horaCita, // Formato esperado: 'HH:mm'
        observaciones: this.observaciones || '',
        costoConsulta: this.costoConsulta,
        descuentoAplicado: this.descuentoAplicado,
        costoTotal: this.costoTotal,
        usuarioRegistro: { idUsuario: 1 }, // Cambia esto si usas autenticación con ID dinámico
      };
  
      // Llamar al servicio para crear la cita
      this.citaService.createCita(nuevaCita).subscribe({
        next: (response) => {
          console.log('Cita creada exitosamente:', response);
          alert('✅ Cita guardada correctamente.');
          this.resetForm(); // Opcional: limpiar formulario
        },
        error: (error) => {
          console.error('Error al guardar la cita:', error);
          alert('❌ No se pudo guardar la cita. Intente nuevamente.');
        },
      });
    }
  
    iniciarCita(idCita: number) {
    const dto: UpdateEstadoCitaDto = { idEstado: 2 }; // Suponiendo que 2 es "En progreso"
    this.citaService.updateEstadoCita(idCita, dto).subscribe({
      next: (citaActualizada) => {
        console.log('Cita iniciada:', citaActualizada);
        this.loadAllAppointments(); // Recargar lista
      },
      error: (err) => {
        console.error('Error al iniciar cita:', err);
        alert('No se pudo iniciar la cita');
      }
    });
  }
  
  cancelarCita(idCita: number) {
    const dto: UpdateEstadoCitaDto = { idEstado: 4 }; // Suponiendo que 3 es "Cancelada"
    this.citaService.updateEstadoCita(idCita, dto).subscribe({
      next: (citaActualizada) => {
        console.log('Cita cancelada:', citaActualizada);
        this.loadAllAppointments(); // Recargar lista
      },
      error: (err) => {
        console.error('Error al cancelar cita:', err);
        alert('No se pudo cancelar la cita');
      }
    });
  }
}
