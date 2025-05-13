import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule, TabAllModule, TabModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-explore-new-car',
  imports: [CommonModule,RouterModule,HttpClientModule,TabModule,TabAllModule,CarouselModule,FormsModule],
  providers: [CategoryService,Router],
  templateUrl: './explore-new-car.component.html',
  styleUrl: './explore-new-car.component.css', 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ExploreNewCarComponent  implements OnInit {
  makeData: any; // Initialize makeData as an empty array
  cars: any[] = [];
  carss: any[] = [];
  minPrice: number = 500000;
  maxPrice: number = 1000000;
  // upcomingMakeData: any[] = [];
  // expiredMakeData: any[] = [];

  constructor(private categoryService: CategoryService, private router:Router) {}

  carTypes: string[] = ['SUV', 'Hatchback', 'Sedan'];
  selectedType: string = '';
  selectedMakeModels: any[] = [];
  selectedMakeName: string = '';
  selectedMakeId: number | null = null;
  
  ngOnInit(): void {
    this.makeData = [];
    this.getMakeData();
    this.getCarsByType('SUV'); 
    this.fetchCarsByPrice(500000, 1000000);
    
}

  
  getMakeData(): void {
    this.categoryService.getMakeById().subscribe(
      (data) => {
        console.log('Raw data from API:', data);
        // Process all makes
        const allMakes = this.processUniqueCompanies(data);
        console.log('All unique makes:', allMakes);

        this.makeData = allMakes; 
        console.log('Current makes data:', this.makeData)
      },
      (error) => {
        console.error('Error fetching makes:', error);
      }
    );
  }

  getCarsByType(type: string) {
    this.selectedType = type;
    this.categoryService.getCarByType(type.trim()).subscribe((data) => {
      this.cars = data;
      console.log('Filtered cars by type:', this.cars); // Add this line
    });
  }

  // fetchCarsByPrice(min: number, max: number) {
  //   this.categoryService.getModelsByPriceRange(min, max).subscribe({
  //     next: (data) => {
  //       this.carss = data;
  //       console.log('extra data',data)
  //     },
  //     error: (err) => {
  //       console.error('Error fetching car models', err);
  //     },
  //   });
  // }
// minPrice: number = 0;
// maxPrice: number = 0;

// fetchCarsByPrice(min: number, max: number) {
//   this.categoryService.getModelsByPriceRange(min, max).subscribe({
//     next: (data) => {
//       this.carss = data;
//       console.log('Filtered cars:', data);
//     },
//     error: (err) => {
//       console.error('Error fetching car models', err);
//     },
//   });
// }

fetchCarsByPrice(min: number, max: number) {
  this.categoryService.getModelsByPriceRange(min, max).subscribe({
    next: (data) => {
      this.carss = data; // This must update your UI
      console.log('Filtered data:', data);
    },
    error: (err) => {
      console.error('Error fetching filtered models:', err);
    },
  });
}

  processUniqueCompanies(data: any[]): any[] {
    const uniqueCompanies = new Map();
    data.forEach((make: any) => {
      if (!uniqueCompanies.has(make.company)) {
        uniqueCompanies.set(make.company, make);
      }
    });
    
    return Array.from(uniqueCompanies.values());
  }

  getImageUrl(path: string): string {
    if (!path) return ''; // safety check
    // const fileName = path.split('/').pop()?.trim();
    const filename = path.split('\\').pop()?.split('/').pop(); 
    return `http://localhost:3000/uploads/models/${filename}`;
  }

  onMakeClick(makeId: number) {
    console.log('Navigating to make-models with makeId:', makeId);
    this.router.navigate(['/make-models', makeId]);  // Pass makeId instead of makeName
  }
  
  // viewModels(makeId: number): void {
  //   localStorage.setItem('selectedMakeId', makeId.toString());  // Save makeId to localStorage
  //   this.router.navigate(['/car-model']);                       // Navigate normally
  // }

  // viewMake(makeName: string): void {
  //   this.router.navigate([`/models/${makeName}`]);  // Navigate to the models page for the selected make
  // }

  viewAllCars(): void {
    // Navigate to all cars page or show modal with all cars  
  console.log('View all cars clicked');
    // You can implement navigation here, for example:
    // this.router.navigate(['/all-cars']);
  }

  viewAllBrands(): void {
    // Navigate to all brands page or show modal with all brands
    console.log('View all brands clicked');
    // You can implement navigation here, for example:
    // this.router.navigate(['/all-brands']);
  }
  
  // tabSelected(e: any): void {
  //   const selectedTab = this.carTypes[e.selectedIndex];
  //   console.log('Selected Tab:', selectedTab); 
  //   this.getCarsByType(selectedTab);
  // }
}
