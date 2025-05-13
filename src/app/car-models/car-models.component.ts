import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service'; // adjust path accordingly
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {  Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-car-models',
  imports: [HttpClientModule,CommonModule, RouterModule],
  providers: [CategoryService],
  standalone: true,
  templateUrl: './car-models.component.html',
  styleUrls: ['./car-models.component.css']
})
export class CarModelsComponent implements OnInit {
  // makeName: string = '';
  // models: any[] = [];
  // makes: any[] = []
  
  makeId!: number;
  makeData: any;
  models: any[] = [];

  constructor( private router: Router, private categoryService: CategoryService) {}

  ngOnInit(): void {
    // Extract makeId from URL path
    const urlSegments = this.router.url.split('/');
    const makeId = +urlSegments[urlSegments.length - 1]; // e.g. /make-models/2 → 2

    if (!isNaN(makeId)) {
      this.fetchModelsByMake(makeId);
    }
    
  }

  fetchModelsByMake(makeId: number): void {
    this.categoryService.getMakeByIdd(makeId).subscribe((make: any) => {
      console.log('Raw make data:', make);
      this.models = make.model || [];
    });
  } 
  
  onViewModel(model: any) {
    console.log('Viewing model:', model);
    // You can navigate to a detail page or open a dialog here
  }
  
  getImageUrl(path: string): string {
    if (!path) return ''; // safety check
    // const fileName = path.split('/').pop()?.trim();
    const filename = path.split('\\').pop()?.split('/').pop(); 
    return `http://localhost:3000/uploads/models/${filename}`;
  }
}