import { Component, OnInit } from '@angular/core';
import { TipoCita } from 'src/app/shared/interfaces/appointment';
import { Aseguradora } from 'src/app/shared/interfaces/insurers';
import { InsurersService } from 'src/app/shared/services/insurers.service';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css'],
})
export class CostsComponent implements OnInit {
  appointmentTypes: TipoCita[] = [];
  loadAppointmentTypes:boolean = true;
  insurers: Aseguradora[] = [];
  loadInsurers:boolean = true;

  constructor(private appointmentService: ServicesService, private insuranceServices:InsurersService) {}

  ngOnInit(): void {
    this.getAllAppointmentTypes()
    this.getAllInsurers()
  }

  getAllAppointmentTypes() {
    this.appointmentService.getAllAppointmentsTypes().subscribe({
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
}
