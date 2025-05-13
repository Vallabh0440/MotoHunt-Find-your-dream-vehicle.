import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from './navbar/navbar.component';
import { ModelDetailComponent } from "./model-detail/model-detail.component";
import { ExploreNewCarComponent } from "./explore-new-car/explore-new-car.component";
import { CarModelsComponent } from "./car-models/car-models.component";
import { UsedCarListComponent } from './used-car-list/used-car-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, NavbarComponent, ModelDetailComponent, ExploreNewCarComponent, UsedCarListComponent,CarModelsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'car-dekho';

  
  selectedModel: string | null = null;
  selectedVariant: string | null = null; // Track selected variant

  onModelSelect(model: string) {
    this.selectedModel = model;
    this.selectedVariant = null; // Reset variant when selecting a new model
    
  }

  onVariantSelect(variant: string) {
    this.selectedVariant = variant;

  }

}
