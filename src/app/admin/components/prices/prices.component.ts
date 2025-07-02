import { Component, OnInit } from '@angular/core';
import { TipoCita } from 'src/app/shared/interfaces/appointment';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {

  appointmentTypes: TipoCita[] = [];
  selectedService: TipoCita | null = null;
  loadAppointmentTypes: boolean = true;

  constructor(private appointmentService: ServicesService) {}

  ngOnInit(): void {
    this.getAllAppointmentTypes();
  }

  getAllAppointmentTypes() {
    this.appointmentService.getAllAppointmentsTypes().subscribe({
      next: (response) => {
        this.appointmentTypes = response;
        this.loadAppointmentTypes = false;
      },
      error: (error) => {
        console.error('Error al cargar tipos de cita:', error);
      }
    });
  }

  // Selecciona un servicio al hacer clic en la tarjeta
  selectService(service: TipoCita) {
    if (this.selectedService === service) {
      this.selectedService = null;
    } else {
      this.selectedService = { ...service }; // Hacemos una copia para no modificar directamente
    }
  }

  // Guardar cambios
  guardarCambios() {
    if (!this.selectedService) {
      alert('No hay ningún servicio seleccionado.');
      return;
    }

    // Validación básica
    if (!this.selectedService.nombreTipo || this.selectedService.costoBase < 0) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    // Llamada al servicio para actualizar
    this.appointmentService.updateAppointmentType(this.selectedService).subscribe({
      next: (updatedService) => {
        alert('Servicio actualizado correctamente');
        // Actualizar lista o reemplazar el registro en local si prefieres
        const index = this.appointmentTypes.findIndex(s => s.idTipoConsulta === updatedService.idTipoConsulta);
        if (index !== -1) {
          this.appointmentTypes[index] = updatedService;
        }
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        alert('Hubo un problema al guardar los cambios.');
      }
    });
  }
}