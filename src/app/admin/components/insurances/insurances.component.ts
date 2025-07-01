import { Component, OnInit } from '@angular/core';
import { Aseguradora } from 'src/app/shared/interfaces/insurers';
import { InsurersService } from 'src/app/shared/services/insurers.service';

@Component({
  selector: 'app-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.css']
})
export class InsurancesComponent implements OnInit {
  insurers: Aseguradora[] = [];
  selectedInsurance: Aseguradora | null = null; // 👈 Nueva propiedad

  constructor(private service: InsurersService) {}

  ngOnInit(): void {
    this.getAllInsurers();
  }

  getAllInsurers() {
    this.service.getAll().subscribe({
      next: (response) => {
        this.insurers = response;
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // 👇 Método para seleccionar una aseguradora
  selectInsurance(insurance: Aseguradora) {
    if(this.selectedInsurance == insurance){
      this.selectedInsurance = null;
      return;
    }
    this.selectedInsurance = insurance;
  }
}