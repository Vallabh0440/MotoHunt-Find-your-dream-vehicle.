import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModelDetailComponent } from './model-detail/model-detail.component';
// import { ElectricCarComponent } from './electric-car/electric-car.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'model/:modelName', component: ModelDetailComponent }, // NEW
];
