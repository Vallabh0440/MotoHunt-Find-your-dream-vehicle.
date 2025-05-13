import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ExploreNewCarComponent } from "../explore-new-car/explore-new-car.component";

@Component({
  selector: 'app-model-detail',
  imports: [HttpClientModule, CommonModule, ButtonModule, ExploreNewCarComponent], 
  providers: [CategoryService],
  templateUrl: './model-detail.component.html',
  styleUrl: './model-detail.component.css',

  
})
export class ModelDetailComponent  implements OnInit{


  modelNameFromUrl: string = '';
  modelData: any = null;
  variantData: any[] = [];
  variantVisible: boolean = false; 
  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const modelName = params.get('modelName');
      console.log('Model Name from URL:', modelName);
      if (modelName) {
        this.fetchModelDetail(modelName);
      }
    });
  }

  fetchModelDetail(modelName: string): void {
    if (this.modelData && this.modelData.modelName === modelName) {
      return; // If data is already loaded, no need to fetch again
    }
    this.categoryService.getdataById(1).subscribe((data: any) => {
      const categories = data.categories || [];
  
      for (const category of categories) {
        for (const make of category.make || []) {
          for (const model of make.model || []) {
            if (model.modelName === modelName) {
              this.modelData = model;
              console.log('Found model:', this.modelData);
              this.variantData = model.variant || [];  // <--- also saving variants
            console.log('Found model:', this.modelData);
            console.log('Variants:', this.variantData);
              return; // stop once we find the model
            }
          }
        }
      }
  
      console.log('Model not found for:', modelName);
      this.modelData = null; // show fallback if not found
    });
  }
  
  // Method to toggle visibility of variants
  toggleVariants(): void {
    this.variantVisible = !this.variantVisible;
  }

  public formatImagePath(path: string): string {
    const imageName = path.split('/').pop();
    return `http://localhost:3000/uploads/models/${imageName}`;
  }
  // For variant image
public formatVariantImagePath(path: string): string {
  const imageName = path.split('/').pop();
  return `http://localhost:3000/uploads/variants/${imageName}`;
}
}
