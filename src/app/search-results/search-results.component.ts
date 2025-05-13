import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule],
  providers:[Router],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  // @Input() filteredCars: any[] = [];
  filteredCars: any[] = [];

  constructor(private router: Router) {
    
    const navigation = this.router.getCurrentNavigation();
    this.filteredCars = navigation?.extras?.state?.['cars'] || [];
    console.log('Received cars:', this.filteredCars);
  }

  
  getImageUrl(path: string): string {
    if (!path) return ''; // safety check
    // const fileName = path.split('/').pop()?.trim();
    const filename = path.split('\\').pop()?.split('/').pop(); 
    return `http://localhost:3000/uploads/models/${filename}`;
  }

}
