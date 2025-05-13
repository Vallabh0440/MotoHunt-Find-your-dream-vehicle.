import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModelDetailComponent } from './model-detail/model-detail.component';
import { ExploreNewCarComponent } from './explore-new-car/explore-new-car.component';
import { CarModelsComponent } from './car-models/car-models.component';
import { UsedCarListComponent } from './used-car-list/used-car-list.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SellMyCarComponent } from './sell-my-car/sell-my-car.component';
// import { ElectricCarComponent } from './electric-car/electric-car.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // {path: 'home', component: HomeComponent},
  { path: 'model/:modelName', component: ModelDetailComponent }, // NEW
  { path: 'explore-new-car', component: ExploreNewCarComponent },
  // { path: 'models/:makeName', component: CarModelsComponent },\
  // { path: 'car-model', component: CarModelsComponent }
  { path: 'make-models/:makeId', component:  CarModelsComponent  },
  { path: 'buy-used-car', component:UsedCarListComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'sell-my-car', component: SellMyCarComponent },
];