import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AppointmentsService } from 'src/app/shared/services/appointments.service';
import { AditionalServicesService } from 'src/app/shared/services/aditional-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {

  // Datos de citas canceladas y médicos
  totalCanceladas: number = 0;
  medicosData: { nombreMedico: string; cantidadCitas: number }[] = [];

  // Datos de servicios adicionales
  cantidadServiciosMensuales: number = 0;
  totalIngresosMensuales: number = 0;
  servicioMasSolicitadoNombre: string = 'Ninguno';
  servicioMasSolicitadoCantidad: number = 0;

  chartInstance: Chart | null = null;

  constructor(
    private appointmentService: AppointmentsService,
    private aditionalServicesService: AditionalServicesService
  ) {}

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Citas canceladas
    this.appointmentService.countCanceledAppointments().subscribe({
      next: (count) => {
        this.totalCanceladas = count;
      },
      error: (err) => {
        console.error('Error al cargar cantidad de citas canceladas:', err);
      },
    });

    // Estadísticas por médico
    this.appointmentService.getStatsByMedico().subscribe({
      next: (data) => {
        this.medicosData = data.map((item: any) => ({
          nombreMedico: item.nombremedico,
          cantidadCitas: item.cantidadcitas,
        }));
        this.updateChart(); // Actualiza el gráfico con los nuevos datos
      },
      error: (err) => {
        console.error('Error al cargar estadísticas por médico:', err);
      },
    });

    // Estadísticas de servicios adicionales - Mensual
    this.aditionalServicesService.getMonthlyStats().subscribe({
      next: (data) => {
        this.cantidadServiciosMensuales = data.cantidad_servicios || 0;
        this.totalIngresosMensuales = data.total_ingresos || 0;
      },
      error: (err) => {
        console.error('Error al cargar estadísticas mensuales:', err);
      },
    });

    // Servicio más solicitado
    this.aditionalServicesService.getMostRequestedService().subscribe({
      next: (data) => {
        this.servicioMasSolicitadoNombre = data.nombre_servicio || 'Desconocido';
        this.servicioMasSolicitadoCantidad = data.total_cantidad || 0;
      },
      error: (err) => {
        console.error('Error al cargar servicio más solicitado:', err);
      },
    });
  }

  updateChart(): void {
    const ctx = document.getElementById('medicosChart') as HTMLCanvasElement;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.medicosData.map(d => d.nombreMedico),
        datasets: [{
          label: 'Citas por Médico',
          data: this.medicosData.map(d => d.cantidadCitas),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Número de Citas',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Médico',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw} citas`;
              }
            },
          },
        },
      },
    });
  }
}