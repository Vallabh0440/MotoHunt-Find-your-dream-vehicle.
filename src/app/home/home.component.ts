import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ModelDetailComponent } from "../model-detail/model-detail.component";
import { MakeComponent } from "../make/make.component";
import { ExploreNewCarComponent } from "../explore-new-car/explore-new-car.component";
import { UsedCarListComponent } from "../used-car-list/used-car-list.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CardComponent, CommonModule, RouterModule, RouterOutlet, ModelDetailComponent, MakeComponent, HttpClientModule,ExploreNewCarComponent, UsedCarListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  imageUrl: string = 'assets/my-image3.jpg'; 
  
  selectedModel: string | null = null;
  selectedVariant: string | null = null; // Track selected variant

  // showHome1() {
  //   this.selectedModel = null;
  //   this.selectedVariant = null; // Reset variant when going back
    
  // }

  onModelSelect(model: string) {
    this.selectedModel = model;
    this.selectedVariant = null; // Reset variant when selecting a new model
    
  }

  onVariantSelect(variant: string) {
    this.selectedVariant = variant;

  }

}
