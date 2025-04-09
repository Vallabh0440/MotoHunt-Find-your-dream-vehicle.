import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-card',
  imports: [DropDownListModule,FormsModule,CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  constructor(){
    
  }
  budgets = ["Under ₹5 Lakh", "₹5 - ₹10 Lakh", "₹10 - ₹20 Lakh", "Above ₹20 Lakh"];
  vehicleTypes = ["Hatchback", "Sedan", "SUV", "MUV", "Luxury"];

  selectedBudget: string | undefined;
  selectedVehicleType: string | undefined;

  searchCars() {
    console.log("Searching cars with:", {
      budget: this.selectedBudget,
      vehicleType: this.selectedVehicleType
    });
  }
}
