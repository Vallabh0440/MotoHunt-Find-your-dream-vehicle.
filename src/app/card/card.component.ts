// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
// import { CarService } from '../services/car.service';
// import { HttpClientModule } from '@angular/common/http';
// import { SearchResultsComponent } from '../search-results/search-results.component';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-card',
//   imports: [
//     DropDownListModule,
//     FormsModule,
//     CommonModule,
//     SearchResultsComponent,
//   ],
//   providers: [HttpClientModule, CarService, Router],
//   templateUrl: './card.component.html',
//   styleUrl: './card.component.css',
// })
// export class CardComponent {
//   ngOnInit() {
//     this.loadAllBrands();
//   }

//   constructor(private carService:CarService , private router: Router) {}
//   selectedBrand: string = '';
//   selectedModel: string = '';
//   budgets = [
//     'Under ₹5 Lakh',
//     '₹5 - ₹10 Lakh',
//     '₹10 - ₹20 Lakh',
//     'Above ₹20 Lakh',
//   ];
//   vehicleTypes = ['Hatchback', 'Sedan', 'SUV', 'MUV', 'Luxury'];

//   selectedBudget: string | undefined;
//   selectedVehicleType: string | undefined;
//   allBrands: string[] = [];
// selectedCarType: string = '';

//   isNewCarSelected: boolean = true; 

//   newCarFilter: string = 'budget';
//   usedCarFilter: string = 'budget';

//   filteredCars: any[] = [];

//   toggleCarType(isNewCar: boolean) {
//     this.isNewCarSelected = isNewCar;
//   }

//   modelsForSelectedBrand: string[] = [];

// onBrandChange(brand: string) {
//   console.log('Selected brand:', brand);
//   this.selectedBrand = brand;
//   this.carService.getAllModels().subscribe((models: any[]) => {
//     this.modelsForSelectedBrand = models
//       .filter(model => model.company === brand)
//       .map(model => model.modelName); // or `model.name` based on your API structure
//       console.log('Filtered models:', this.modelsForSelectedBrand); // Log 
//   });
// }

//   getPriceRange(budget: string): [number, number] {
//     switch (budget) {
//       case 'Under ₹5 Lakh':
//         return [0, 500000];
//       case '₹5 - ₹10 Lakh':
//         return [500000, 1000000];
//       case '₹10 - ₹20 Lakh':
//         return [1000000, 2000000];
//       case 'Above ₹20 Lakh':
//         return [2000000, 10000000];
//       default:
//         return [0, 10000000]; // fallback range
//     }
//   }
  
// loadAllBrands() {
//   this.carService.getAllModels().subscribe((models: any[]) => {
//     const brandsSet = new Set(models.map(model => model.company));
//     this.allBrands = Array.from(brandsSet);
//     console.log('Available brands:', this.allBrands); // 
//   });

// }

// searchCars() {
//   if (this.isNewCarSelected && this.newCarFilter === 'budget') {
//     const [minPrice, maxPrice] = this.getPriceRange(this.selectedBudget || '');
//     const payload = {
//       minPrice,
//       maxPrice,
//       carType: this.selectedVehicleType?.trim() || '',
//     };

//     this.carService.filterCars(payload).subscribe(
//       (cars) => {
//         this.router.navigate(['/search-results'], {
//           state: { cars },
//         });
//       },
//       (error) => console.error('Error filtering by budget:', error)
//     );
//   } 
  
//   else if (this.isNewCarSelected && this.newCarFilter === 'brand') {
//     const payload = {
//       company: this.selectedBrand.trim(),
//       carType: this.selectedCarType.trim(),
//     };

//     this.carService.getCarsByBrandAndType(payload).subscribe(
//       (cars) => {
//         this.router.navigate(['/search-results'], {
//           state: { cars },
//         });
//       },
//       (error) => console.error('Error filtering by brand and type:', error)
//     );
//   }
// }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CarService } from '../services/car.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true, // Add this if you're using Angular 17+
  imports: [
    DropDownListModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    SearchResultsComponent,
  ],
  providers: [CarService],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'], // Note: styleUrls is an array
})
export class CardComponent implements OnInit {
  // Car selection properties
  isNewCarSelected: boolean = true; // Default to New Car
  newCarFilter: string = 'budget'; // Default filter for new cars
  usedCarFilter: string = 'budget'; // Default filter for used cars
  
  // Selection properties
  selectedBrand: string = '';
  selectedModel: string = '';
  selectedBudget: string = '';
  selectedVehicleType: string = '';
  selectedCarType: string = '';
  
  // Data lists
  allBrands: string[] = [];
  modelsForSelectedBrand: string[] = [];
  filteredCars: any[] = [];
  allModels: any[] = [];
  
  // Preset options
  budgets = [
    'Under ₹5 Lakh',
    '₹5 - ₹10 Lakh',
    '₹10 - ₹20 Lakh',
    'Above ₹20 Lakh',
  ];
  
  vehicleTypes = ['Hatchback', 'Sedan', 'SUV', 'MUV', 'Luxury'];

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit() {
    this.loadAllBrands();
  }

  // Toggle between New and Used car selection
  toggleCarType(isNewCar: boolean) {
    this.isNewCarSelected = isNewCar;
    // Reset selections when switching car type
    this.resetSelections();
  }

  // Reset all selection fields
  resetSelections() {
    this.selectedBrand = '';
    this.selectedModel = '';
    this.selectedBudget = '';
    this.selectedVehicleType = '';
    this.selectedCarType = '';
    this.modelsForSelectedBrand = [];
  }

  // Load all available car brands
  loadAllBrands() {
    this.carService.getAllModels().subscribe({
      next: (models: any[]) => {
        const brandsSet = new Set(models.map(model => model.company));
        this.allBrands = Array.from(brandsSet);
        console.log('Available brands:', this.allBrands);
      },
      error: (error) => {
        console.error('Error loading brands:', error);
      }
    });
  }

  // Handle brand selection change
  // onBrandChange(brand: string) {
  //   console.log('Selected brand:', brand);
  //   if (!brand) {
  //     this.modelsForSelectedBrand = [];
  //     return;
  //   }
    
  //   this.carService.getAllModels().subscribe({
  //     next: (models: any[]) => {
  //       this.modelsForSelectedBrand = models
  //         .filter(model => model.company === brand)
  //         .map(model => model.modelName);
  //       console.log('Filtered models:', this.modelsForSelectedBrand);
  //     },
  //     error: (error) => {
  //       console.error('Error loading models for brand:', error);
  //     }
  //   });
  // }



  // onBrandChange(brand: string) {
  //   console.log('onBrandChange received:', brand); // NEW
  //   if (!brand) {
  //     this.modelsForSelectedBrand = [];
  //     return;
  //   }
  
  //   this.carService.getAllModels().subscribe({
  //     next: (models: any[]) => {
  //       this.modelsForSelectedBrand = models
  //         .filter(model => model.company === brand)
  //         .map(model => model.modelName);
  //         console.log('Sample model:', models[0]); // log this to inspect the keys
  //       console.log('Filtered models:', this.modelsForSelectedBrand);
  //     },
  //     error: (error) => {
  //       console.error('Error loading models for brand:', error);
  //     }
  //   });
  // }

  onBrandChange(brand: string) {
    console.log('onBrandChange received:', brand);
    if (!brand) {
      this.modelsForSelectedBrand = [];
      return;
    }
  
    this.carService.getAllModels().subscribe({
      next: (models: any[]) => {
        console.log('Sample model:', models[0]);
        this.modelsForSelectedBrand = models
          .filter(model => model.make.company === brand)
          .map(model => model.modelName);
        console.log('Filtered models:', this.modelsForSelectedBrand);
      },
      error: (error) => {
        console.error('Error loading models for brand:', error);
      }
    });
  }
  
  

  // Helper method to convert budget string to price range
  getPriceRange(budget: string): [number, number] {
    switch (budget) {
      case 'Under ₹5 Lakh':
        return [0, 500000];
      case '₹5 - ₹10 Lakh':
        return [500000, 1000000];
      case '₹10 - ₹20 Lakh':
        return [1000000, 2000000];
      case 'Above ₹20 Lakh':
        return [2000000, 10000000];
      default:
        return [0, 10000000]; // fallback range
    }
  }

  // Search for cars based on selected criteria
  searchCars() {
    if (this.isNewCarSelected && this.newCarFilter === 'budget') {
      const [minPrice, maxPrice] = this.getPriceRange(this.selectedBudget || '');
      const payload = {
        minPrice,
        maxPrice,
        carType: this.selectedVehicleType || '',
      };
      
      this.carService.filterCars(payload).subscribe({
        next: (cars) => {
          this.router.navigate(['/search-results'], {
            state: { cars },
          });
        },
        error: (error) => console.error('Error filtering by budget:', error)
      });
    } 
    else if (this.isNewCarSelected && this.newCarFilter === 'brand') {
      const payload = {
        company: this.selectedBrand,
        carType: this.selectedCarType,
      };
      
      this.carService.getCarsByBrandAndType(payload).subscribe({
        next: (cars) => {
          this.router.navigate(['/search-results'], {
            state: { cars },
          });
        },
        error: (error) => console.error('Error filtering by brand and type:', error)
      });
    }
    // Add handlers for used car search if needed
  }
}