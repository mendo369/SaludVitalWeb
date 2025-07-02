import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  // Datos que obtendrás del backend (ejemplo)
  medicosData = [
    { nombreMedico: 'Dr. Juan', cantidadCitas: 45 },
    { nombreMedico: 'Dra. María', cantidadCitas: 38 },
    { nombreMedico: 'Dr. Carlos', cantidadCitas: 30 },
    { nombreMedico: 'Dra. Ana', cantidadCitas: 22 },
  ];

  ngAfterViewInit(): void {
    this.createBarChart();
  }

  createBarChart(): void {
    const ctx = document.getElementById('medicosChart') as HTMLCanvasElement;

    new Chart(ctx, {
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
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Número de Citas'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Médico'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw} citas`;
              }
            }
          }
        }
      }
    });
  }
}